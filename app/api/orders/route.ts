import { NextResponse } from "next/server";
import { orders } from "@/lib/order";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    orders,
    updatedAt: new Date().toISOString(),
  });
}
