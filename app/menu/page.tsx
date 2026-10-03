import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
interface Dish {
  id: string;
  name: string;
  price: number;
  category: string;
  spicy: boolean;
}

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

interface MenuPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  const category = params?.category || "All";

  const filteredDishes =
    category === "All"
      ? dishesData
      : dishesData.filter((d) => d.category === category);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <CategoryBar activeCategory={category} />
      <DishList dishes={filteredDishes} />
    </main>
  );
}
