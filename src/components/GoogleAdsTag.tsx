"use client";

import React from "react";
import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/gtag";

export const GoogleAdsTag: React.FC = () => {
  if (!GOOGLE_ADS_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(GOOGLE_ADS_ID)}, {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};
