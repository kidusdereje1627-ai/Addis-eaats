import Link from "next/link";

export interface Dish {
  id: string;
  name: string;
  price: number;
  category: string;
  spicy: boolean;
}

export default function DishList({ dishes }: { dishes: Dish[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {dishes.map((dish) => (
        <div key={dish.id} className="p-4 border rounded shadow-sm">
          <h3 className="font-bold text-lg">
            {dish.name} {dish.spicy ? "🌶" : ""}
          </h3>
          <p className="text-gray-600">{dish.price} ETB</p>
          <Link
            href={`/menu/${dish.id}`}
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            View Dish
          </Link>
        </div>
      ))}
    </div>
  );
}
