"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type Dish = {
  id: string;
  name: string;
  price: number;
  category: string;
  spicy: boolean;
  description: string;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

async function fetchDish(id: string): Promise<Dish> {
  const response = await fetch(`/api/dishes/${id}`);

  if (!response.ok) {
    throw new Error(
      response.status === 404 ? "Dish not found." : "Failed to load dish.",
    );
  }

  return response.json();
}

export default function DishDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const {
    data: dish,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["dish", id],
    queryFn: () => fetchDish(id),
    enabled: Boolean(id),
    staleTime: 60_000,
  });

  function addToCart() {
    if (!dish) return;

    try {
      const storedCart = localStorage.getItem("addisEatsCart");
      const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const existingItem = cart.find((item) => item.id === dish.id);

      let updatedCart: CartItem[];

      if (existingItem) {
        updatedCart = cart.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        updatedCart = [
          ...cart,
          {
            id: dish.id,
            name: dish.name,
            price: dish.price,
            quantity,
          },
        ];
      }

      localStorage.setItem("addisEatsCart", JSON.stringify(updatedCart));

      setAdded(true);
    } catch {
      alert("Could not add this dish to the cart.");
    }
  }

  if (isPending) {
    return <p>Loading dish...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-600">
        {error instanceof Error ? error.message : "Something went wrong."}
      </p>
    );
  }

  if (!dish) {
    return <p>Dish not found.</p>;
  }

  return (
    <main className="mx-auto max-w-2xl">
      <Link
        href="/menu"
        className="mb-4 inline-block text-green-700 hover:underline">
        ← Back to Menu
      </Link>

      <div className="rounded-xl border border-gray-200 p-6">
        <h1 className="mb-3 text-3xl font-bold">
          {dish.name} {dish.spicy ? "🌶️" : ""}
        </h1>

        <p className="mb-2 text-gray-600">Category: {dish.category}</p>

        <p className="mb-3 text-xl font-semibold">Price: {dish.price} ETB</p>

        <p className="mb-6 text-gray-700">{dish.description}</p>

        <div className="mb-5 flex items-center gap-4">
          <span className="font-medium">Quantity:</span>

          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            disabled={quantity <= 1}
            className="rounded border px-3 py-1 disabled:opacity-50">
            −
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            onClick={() => setQuantity((current) => current + 1)}
            className="rounded border px-3 py-1">
            +
          </button>
        </div>

        <p className="mb-5 font-semibold">Total: {dish.price * quantity} ETB</p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={addToCart}
            className="rounded-lg bg-green-700 px-5 py-3 text-white hover:bg-green-800">
            Add to Cart
          </button>
          <Link
            href="/cart"
            className="inline-block rounded-lg border border-green-700 px-5 py-3 text-green-700 hover:bg-green-50">
            Go to Cart
          </Link>
        </div>

        {added && (
          <p role="status" className="mt-4 font-medium text-green-700">
            Added to cart successfully!
          </p>
        )}
      </div>
    </main>
  );
}
