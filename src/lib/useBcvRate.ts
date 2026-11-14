"use client";

import { useState, useEffect } from "react";
import { DEFAULT_USD_BCV_RATE } from "@/lib/bcv";

interface BcvCache {
  rate: number;
  usd: number;
  eur: number;
  date: string;
  source: string;
  timestamp: number;
}

// Singleton en memoria del cliente para evitar tormentas de peticiones HTTP duplicadas
let clientBcvCache: BcvCache | null = null;
let pendingBcvPromise: Promise<BcvCache | null> | null = null;

const DEFAULT_RATE = DEFAULT_USD_BCV_RATE;

async function fetchBcvRateOnce(): Promise<BcvCache | null> {
  const now = Date.now();
  // Usar caché si tiene menos de 2 minutos
  if (clientBcvCache && now - clientBcvCache.timestamp < 120000) {
    return clientBcvCache;
  }

  if (pendingBcvPromise) {
    return pendingBcvPromise;
  }

  pendingBcvPromise = (async () => {
    try {
      const res = await fetch("/api/bcv", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json?.data?.rate && typeof json.data.rate === "number") {
          clientBcvCache = {
            rate: json.data.rate,
            usd: json.data.usd || json.data.rate,
            eur: json.data.eur || Number((json.data.rate * 1.085).toFixed(2)),
            date: json.data.date || new Date().toISOString(),
            source: json.data.source || "BCV Oficial",
            timestamp: Date.now(),
          };
          return clientBcvCache;
        }
      }
    } catch (err) {
      console.warn("[BCV CACHE NOTICE] Usando tasa en memoria:", err);
    } finally {
      pendingBcvPromise = null;
    }
    return clientBcvCache;
  })();

  return pendingBcvPromise;
}

export function useBcvRate() {
  const [rate, setRate] = useState<number>(clientBcvCache ? clientBcvCache.rate : DEFAULT_RATE);
  const [isLive, setIsLive] = useState<boolean>(Boolean(clientBcvCache));
  const [data, setData] = useState<BcvCache | null>(clientBcvCache);

  useEffect(() => {
    let isMounted = true;
    fetchBcvRateOnce().then((cached) => {
      if (isMounted && cached) {
        setRate(cached.rate);
        setData(cached);
        setIsLive(true);
      }
    });

    // Revalidación periódica compartida cada 3 minutos
    const interval = setInterval(() => {
      fetchBcvRateOnce().then((cached) => {
        if (isMounted && cached) {
          setRate(cached.rate);
          setData(cached);
          setIsLive(true);
        }
      });
    }, 180000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { rate, isLive, data };
}
