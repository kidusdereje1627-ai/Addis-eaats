import { notFound } from "next/navigation";
import Link from "next/link";
import type { Dish } from "../DishList";

const dishesData: Dish[] = [
  {
    id: "1",
    name: "Special Kitfo",
    price: 320,
    category: "Mains",
    spicy: true,
  },
  {
    id: "2",
    name: "Shiro Tegabino",
    price: 180,
    category: "Mains",
    spicy: false,
  },
  {
    id: "3",
    name: "Chechebsa",
    price: 160,
    category: "Breakfast",
    spicy: false,
  },
];

interface DishDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DishDetailPage({ params }: DishDetailPageProps) {
  const { id } = await params;
  const dish = dishesData.find((d) => d.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <Link href="/menu" className="text-blue-500 hover:underline">
        ← Back to Menu
      </Link>
      <h1 className="text-2xl font-bold mt-2">
        {dish.name} {dish.spicy ? "🌶" : ""}
      </h1>
      <p className="text-gray-700 mt-1">Category: {dish.category}</p>
      <p className="text-gray-700">Price: {dish.price} ETB</p>
    </main>
  );
}
