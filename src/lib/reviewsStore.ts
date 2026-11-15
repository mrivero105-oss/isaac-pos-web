import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface StoredCustomerReview {
  id: string;
  name: string;
  role: string;
  business: string;
  city: string;
  category: string;
  rating: number;
  comment: string;
  contactInfo: string;
  status: ReviewStatus;
  createdAt: string;
  verifiedDate: string;
}

export type PublicCustomerReview = Omit<StoredCustomerReview, "contactInfo">;

const REDIS_KEY = "isaac_pos_customer_reviews_v1";
const GIST_FILENAME = "isaac-pos-reviews.json";

function getLocalStorePath(): string {
  if (process.env.VERCEL) {
    return "/tmp/isaac-pos-reviews.json";
  }
  return path.join(process.cwd(), ".data", "reviews.json");
}

function getExpectedAdminPassword(): string {
  const envPass = process.env.ADMIN_REVIEWS_PASSWORD?.trim();
  if (envPass && envPass.length >= 6) {
    return envPass;
  }
  return "IsaacAdmin2026*";
}

export function verifyAdminPassword(candidate: string | null | undefined): boolean {
  if (!candidate) return false;
  const expected = getExpectedAdminPassword();
  const a = Buffer.from(candidate.trim(), "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function getActiveStorageBackend(): "upstash" | "gist" | "local" {
  if (
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  ) {
    return "upstash";
  }
  if (
    process.env.REVIEWS_GIST_ID?.trim() &&
    process.env.REVIEWS_GITHUB_TOKEN?.trim()
  ) {
    return "gist";
  }
  return "local";
}

async function readFromUpstash(): Promise<StoredCustomerReview[] | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/get/${REDIS_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: string | null };
    if (!data.result) return [];
    const parsed = JSON.parse(data.result);
    return Array.isArray(parsed) ? (parsed as StoredCustomerReview[]) : [];
  } catch (err) {
    console.error("[REVIEWS UPSTASH READ ERROR]", err);
    return null;
  }
}

async function writeToUpstash(reviews: StoredCustomerReview[]): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return false;

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/set/${REDIS_KEY}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.stringify(reviews)),
      cache: "no-store",
    });
    return res.ok;
  } catch (err) {
    console.error("[REVIEWS UPSTASH WRITE ERROR]", err);
    return false;
  }
}

async function readFromGist(): Promise<StoredCustomerReview[] | null> {
  const gistId = process.env.REVIEWS_GIST_ID?.trim();
  const ghToken = process.env.REVIEWS_GITHUB_TOKEN?.trim();
  if (!gistId || !ghToken) return null;

  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "Isaac-POS-Reviews-Store",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      files?: Record<string, { content?: string }>;
    };
    const raw = data.files?.[GIST_FILENAME]?.content;
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredCustomerReview[]) : [];
  } catch (err) {
    console.error("[REVIEWS GIST READ ERROR]", err);
    return null;
  }
}

async function writeToGist(reviews: StoredCustomerReview[]): Promise<boolean> {
  const gistId = process.env.REVIEWS_GIST_ID?.trim();
  const ghToken = process.env.REVIEWS_GITHUB_TOKEN?.trim();
  if (!gistId || !ghToken) return false;

  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "Isaac-POS-Reviews-Store",
      },
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(reviews, null, 2),
          },
        },
      }),
      cache: "no-store",
    });
    return res.ok;
  } catch (err) {
    console.error("[REVIEWS GIST WRITE ERROR]", err);
    return false;
  }
}

async function readFromLocalFile(): Promise<StoredCustomerReview[]> {
  try {
    const filePath = getLocalStorePath();
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredCustomerReview[]) : [];
  } catch {
    return [];
  }
}

async function writeToLocalFile(reviews: StoredCustomerReview[]): Promise<void> {
  try {
    const filePath = getLocalStorePath();
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(reviews, null, 2), "utf8");
  } catch (err) {
    console.error("[REVIEWS LOCAL WRITE ERROR]", err);
  }
}

export async function getAllStoredReviews(): Promise<StoredCustomerReview[]> {
  const upstash = await readFromUpstash();
  if (upstash !== null) return upstash;

  const gist = await readFromGist();
  if (gist !== null) return gist;

  return readFromLocalFile();
}

export async function saveAllStoredReviews(
  reviews: StoredCustomerReview[]
): Promise<void> {
  const savedUpstash = await writeToUpstash(reviews);
  if (savedUpstash) return;

  const savedGist = await writeToGist(reviews);
  if (savedGist) return;

  await writeToLocalFile(reviews);
}

export async function getApprovedPublicReviews(): Promise<PublicCustomerReview[]> {
  const all = await getAllStoredReviews();
  return all
    .filter((r) => r.status === "approved")
    .map(({ contactInfo: _unused, ...publicFields }) => {
      void _unused;
      return publicFields;
    });
}

export async function createStoredReview(
  input: Omit<StoredCustomerReview, "id" | "createdAt" | "verifiedDate" | "status">,
  initialStatus: ReviewStatus = "pending"
): Promise<StoredCustomerReview> {
  const all = await getAllStoredReviews();
  const now = new Date();
  const verifiedDate = now.toLocaleDateString("es-VE", {
    month: "short",
    year: "numeric",
  });

  const newReview: StoredCustomerReview = {
    id: `rev_${now.getTime()}_${crypto.randomBytes(3).toString("hex")}`,
    name: input.name,
    role: input.role || "Propietario",
    business: input.business,
    city: input.city,
    category: input.category,
    rating: input.rating,
    comment: input.comment,
    contactInfo: input.contactInfo,
    status: initialStatus,
    createdAt: now.toISOString(),
    verifiedDate,
  };

  const updated = [newReview, ...all].slice(0, 200);
  await saveAllStoredReviews(updated);
  return newReview;
}

export async function updateStoredReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<StoredCustomerReview | null> {
  const all = await getAllStoredReviews();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  all[idx] = {
    ...all[idx],
    status,
    verifiedDate: new Date().toLocaleDateString("es-VE", {
      month: "short",
      year: "numeric",
    }),
  };

  await saveAllStoredReviews(all);
  return all[idx];
}

export async function deleteStoredReview(id: string): Promise<boolean> {
  const all = await getAllStoredReviews();
  const filtered = all.filter((r) => r.id !== id);
  if (filtered.length === all.length) return false;
  await saveAllStoredReviews(filtered);
  return true;
}
