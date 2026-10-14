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
    description: "Traditional Ethiopian kitfo.",
  },
  {
    id: "2",
    name: "Shiro Tegabino",
    price: 180,
    category: "Mains",
    spicy: false,
    description: "Ethiopian chickpea stew.",
  },
  {
    id: "3",
    name: "Chechebsa",
    price: 160,
    category: "Breakfast",
    spicy: false,
    description: "Traditional Ethiopian breakfast.",
  },
  {
    id: "4",
    name: "Doro Wot",
    price: 280,
    category: "Mains",
    spicy: true,
    description: "Spicy Ethiopian chicken stew.",
  },
  {
    id: "5",
    name: "Firfir",
    price: 150,
    category: "Breakfast",
    spicy: true,
    description: "Injera mixed with seasoned sauce.",
  },
  {
    id: "6",
    name: "Beyaynet",
    price: 200,
    category: "Vegetarian",
    spicy: false,
    description: "Ethiopian vegetarian combination.",
  },
  {
    id: "7",
    name: "Tibs",
    price: 350,
    category: "Mains",
    spicy: true,
    description: "Ethiopian sautéed meat.",
  },
  {
    id: "8",
    name: "Genfo",
    price: 120,
    category: "Breakfast",
    spicy: false,
    description: "Traditional Ethiopian porridge.",
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

export function getDishById(id: string) {
  return dishes.find((dish) => dish.id === id);
}
