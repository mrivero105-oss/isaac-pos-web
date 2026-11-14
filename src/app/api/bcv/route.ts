import { NextResponse } from "next/server";
import { getBcvRates } from "@/lib/bcv";

export async function GET() {
  const rates = await getBcvRates(4000);

  return NextResponse.json(
    {
      success: true,
      data: rates,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
