import { NextRequest, NextResponse } from "next/server";
import { getDishes } from "@/lib/dishes";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";

  const requestedPage = Number(searchParams.get("page") ?? "1");

  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;

  const result = getDishes(search, page, 4);

  return NextResponse.json(result);
}
