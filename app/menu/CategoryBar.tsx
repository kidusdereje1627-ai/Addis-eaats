"use client";

import Link from "next/link";

const categories = ["All", "Breakfast", "Mains", "Drinks"];

interface CategoryBarProps {
  activeCategory: string;
}

export default function CategoryBar({ activeCategory }: CategoryBarProps) {
  return (
    <div className="flex gap-2 mb-4">
      {categories.map((cat) => (
        <Link
          key={cat}
          href={cat === "All" ? "/menu" : `/menu?category=${cat}`}
          className={`px-3 py-1 border rounded ${
            activeCategory === cat
              ? "bg-black text-white font-bold"
              : "bg-white text-black"
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
