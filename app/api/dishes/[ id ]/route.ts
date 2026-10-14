import { NextResponse } from "next/server";

const dishesModule = require("@/lib/dishes") as {
  getDishById?: (id: string) => any;
  getDish?: (id: string) => any;
};

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const dish =
    typeof dishesModule.getDishById === "function"
      ? dishesModule.getDishById(id)
      : typeof dishesModule.getDish === "function"
        ? dishesModule.getDish(id)
        : undefined;

  if (!dish) {
    return NextResponse.json({ message: "Dish not found" }, { status: 404 });
  }

  return NextResponse.json(dish);
}
