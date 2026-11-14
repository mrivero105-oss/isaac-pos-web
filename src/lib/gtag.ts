/**
 * Módulo de Seguimiento de Google Ads y Analytics para Isaac POS
 * Incluye validación estricta de IDs para evitar inyección de script.
 */

const RAW_ADS_ID = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "").trim();
const RAW_CONVERSION_LABEL = (
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || ""
).trim();

const VALID_ADS_ID_PATTERN = /^(AW|G|GT|DC)-[A-Za-z0-9_-]{4,32}$/;
const VALID_LABEL_PATTERN = /^[A-Za-z0-9_-]{4,64}$/;

export const GOOGLE_ADS_ID = VALID_ADS_ID_PATTERN.test(RAW_ADS_ID) ? RAW_ADS_ID : "";
export const GOOGLE_ADS_CONVERSION_LABEL = VALID_LABEL_PATTERN.test(RAW_CONVERSION_LABEL)
  ? RAW_CONVERSION_LABEL
  : "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const CONVERSION_EVENTS = new Set([
  "click_whatsapp",
  "submit_lead",
  "generate_order",
]);

/**
 * Registra un evento personalizado o de conversión en Google Ads / Analytics.
 */
export const trackGoogleAdsEvent = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    ...params,
  });

  if (
    CONVERSION_EVENTS.has(eventName) &&
    GOOGLE_ADS_ID &&
    GOOGLE_ADS_CONVERSION_LABEL
  ) {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      value: typeof params?.value === "number" ? params.value : 1.0,
      currency: "USD",
    });
  }
};
