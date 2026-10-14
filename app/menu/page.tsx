import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

interface MenuPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  const category = params?.category || "All";

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      <CategoryBar activeCategory={category} />

      <DishList />
    </main>
  );
}
