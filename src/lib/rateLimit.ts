import type { NextRequest } from "next/server";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();
const MAX_LOCAL_KEYS = 5000;

const IP_REGEX = /^[0-9a-fA-F:.]{3,45}$/;

/**
 * Extrae una IP confiable evitando aceptar encabezados arbitrarios malformados.
 * En Vercel/Cloudflare prioriza headers asignados por el edge proxy.
 */
export function getClientIp(req: NextRequest | Request): string {
  const headers = req.headers;
  const candidateHeaders = [
    headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim(),
    headers.get("cf-connecting-ip")?.trim(),
    headers.get("x-real-ip")?.trim(),
    headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ];

  for (const candidate of candidateHeaders) {
    if (candidate && IP_REGEX.test(candidate)) {
      return candidate;
    }
  }

  return "unknown-client";
}

function purgeExpiredLocalEntries(now: number): void {
  for (const [key, val] of rateLimitStore.entries()) {
    if (now > val.resetTime) {
      rateLimitStore.delete(key);
    }
  }
  if (rateLimitStore.size > MAX_LOCAL_KEYS) {
    const excess = rateLimitStore.size - MAX_LOCAL_KEYS;
    let removed = 0;
    for (const key of rateLimitStore.keys()) {
      rateLimitStore.delete(key);
      removed += 1;
      if (removed >= excess) break;
    }
  }
}

/**
 * Rate Limiter en memoria con limpieza automática de claves expiradas.
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  if (rateLimitStore.size > 500) {
    purgeExpiredLocalEntries(now);
  }

  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    const reset = now + windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: reset,
    });
    return { success: true, remaining: Math.max(0, limit - 1), reset };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: record.resetTime };
  }

  record.count += 1;
  return {
    success: true,
    remaining: Math.max(0, limit - record.count),
    reset: record.resetTime,
  };
}

/**
 * Rate limiter distribuido vía Upstash Redis REST (cuando está configurado)
 * con fallback transparente a memoria local.
 */
export async function checkRateLimitDistributed(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!upstashUrl || !upstashToken) {
    return checkRateLimit(identifier, limit, windowMs);
  }

  const now = Date.now();
  const windowSec = Math.max(1, Math.ceil(windowMs / 1000));
  const redisKey = `rl:${identifier}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const res = await fetch(`${upstashUrl.replace(/\/+$/, "")}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${upstashToken}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify([
        ["INCR", redisKey],
        ["EXPIRE", redisKey, windowSec, "NX"],
        ["PTTL", redisKey],
      ]),
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = (await res.json()) as Array<{ result?: number }>;
      const count = Number(data?.[0]?.result ?? 1);
      const ttlMs = Number(data?.[2]?.result ?? windowMs);
      const reset = now + (ttlMs > 0 ? ttlMs : windowMs);

      return {
        success: count <= limit,
        remaining: Math.max(0, limit - count),
        reset,
      };
    }
  } catch (err) {
    console.warn("[RATE LIMIT UPSTASH FALLBACK]", err);
  }

  return checkRateLimit(identifier, limit, windowMs);
}
