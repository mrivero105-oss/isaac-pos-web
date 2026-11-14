export const DEFAULT_USD_BCV_RATE = 857.89;
export const DEFAULT_EUR_BCV_RATE = 930.81;

export interface BcvRatesData {
  rate: number;
  usd: number;
  eur: number;
  date: string;
  lastUpdated: number;
  source: string;
  isFallback: boolean;
}

const CACHE_TTL_MS = 300_000; // 5 minutos

let cachedRates: BcvRatesData = {
  rate: DEFAULT_USD_BCV_RATE,
  usd: DEFAULT_USD_BCV_RATE,
  eur: DEFAULT_EUR_BCV_RATE,
  date: new Date().toISOString(),
  lastUpdated: 0,
  source: "Banco Central de Venezuela (BCV Oficial)",
  isFallback: true,
};

let pendingRatesPromise: Promise<BcvRatesData> | null = null;

async function fetchJsonWithTimeout(url: string, timeoutMs: number): Promise<unknown | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "Isaac-POS-Web/1.0",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Obtiene y cachea en servidor las tasas oficiales USD y EUR BCV con respaldo resiliente.
 */
export async function getBcvRates(timeoutMs: number = 3800): Promise<BcvRatesData> {
  const now = Date.now();
  if (cachedRates.lastUpdated > 0 && now - cachedRates.lastUpdated < CACHE_TTL_MS) {
    return cachedRates;
  }

  if (pendingRatesPromise) {
    return pendingRatesPromise;
  }

  pendingRatesPromise = (async () => {
    try {
      const [usdRaw, eurRaw] = await Promise.all([
        fetchJsonWithTimeout("https://ve.dolarapi.com/v1/dolares/oficial", timeoutMs),
        fetchJsonWithTimeout("https://ve.dolarapi.com/v1/euros/oficial", timeoutMs),
      ]);

      const usdObj = usdRaw as { promedio?: unknown; fechaActualizacion?: unknown } | null;
      const eurObj = eurRaw as { promedio?: unknown } | null;

      if (usdObj && typeof usdObj.promedio === "number" && usdObj.promedio > 0) {
        const roundedUsd = Number(usdObj.promedio.toFixed(2));
        const hasRealEur = Boolean(
          eurObj && typeof eurObj.promedio === "number" && eurObj.promedio > 0
        );
        const roundedEur = hasRealEur
          ? Number((eurObj!.promedio as number).toFixed(2))
          : Number((roundedUsd * 1.085).toFixed(2));

        cachedRates = {
          rate: roundedUsd,
          usd: roundedUsd,
          eur: roundedEur,
          date:
            typeof usdObj.fechaActualizacion === "string" && usdObj.fechaActualizacion
              ? usdObj.fechaActualizacion
              : new Date().toISOString(),
          lastUpdated: Date.now(),
          source: "Banco Central de Venezuela (BCV Oficial)",
          isFallback: false,
        };
      }
    } catch (err) {
      console.warn("[BCV SERVER NOTICE] No se pudo actualizar tasa BCV en vivo:", err);
    } finally {
      pendingRatesPromise = null;
    }

    return cachedRates;
  })();

  return pendingRatesPromise;
}
