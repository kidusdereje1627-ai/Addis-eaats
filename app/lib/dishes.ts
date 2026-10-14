export type Dish = {
  id: string;
  name: string;
  price: number;
  category: string;
  spicy: boolean;
  description: string;
};

export const dishes: Dish[] = [
  {
    id: "1",
    name: "Special Kitfo",
    price: 320,
    category: "Mains",
    spicy: true,
    description: "A traditional Ethiopian dish prepared with seasoned kitfo.",
  },
  {
    id: "2",
    name: "Shiro Tegabino",
    price: 180,
    category: "Mains",
    spicy: false,
    description: "A delicious Ethiopian chickpea stew.",
  },
  {
    id: "3",
    name: "Chechebsa",
    price: 160,
    category: "Breakfast",
    spicy: false,
    description: "Traditional Ethiopian flatbread breakfast.",
  },
  {
    id: "4",
    name: "Doro Wot",
    price: 280,
    category: "Mains",
    spicy: true,
    description: "Traditional Ethiopian spicy chicken stew.",
  },
  {
    id: "5",
    name: "Firfir",
    price: 150,
    category: "Breakfast",
    spicy: true,
    description: "Ethiopian injera mixed with a seasoned sauce.",
  },
  {
    id: "6",
    name: "Beyaynet",
    price: 200,
    category: "Vegetarian",
    spicy: false,
    description: "A colorful selection of Ethiopian vegetarian dishes.",
  },
  {
    id: "7",
    name: "Tibs",
    price: 350,
    category: "Mains",
    spicy: true,
    description: "Ethiopian sautéed meat seasoned with spices.",
  },
  {
    id: "8",
    name: "Genfo",
    price: 120,
    category: "Breakfast",
    spicy: false,
    description: "Traditional Ethiopian breakfast porridge.",
  },
];

export function getDishes(search: string, page: number, limit: number) {
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(normalizedSearch),
  );

  const start = (page - 1) * limit;

  return {
    items: filtered.slice(start, start + limit),
    total: filtered.length,
    page,
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
  };
}

export function getDishById(id: string): Dish | undefined {
  return dishes.find((dish) => dish.id === id);
}
