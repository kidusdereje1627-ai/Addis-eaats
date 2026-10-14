"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export interface Dish {
  id: string;
  name: string;
  price: number;
  category: string;
  spicy: boolean;
}

interface DishResponse {
  items: Dish[];
  total: number;
  page: number;
  totalPages: number;
}

async function fetchDishes(
  search: string,
  page: number,
): Promise<DishResponse> {
  const params = new URLSearchParams({
    search,
    page: String(page),
  });

  const response = await fetch(`/api/Dishes?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to load dishes.");
  }

  return response.json();
}

export default function DishList() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  // Wait 300ms after the user stops typing before searching.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data,
    isPending,
    isError,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["dishes", debouncedSearch, page],
    queryFn: () => fetchDishes(debouncedSearch, page),
    staleTime: 30_000,
    placeholderData: (previousData) => previousData,
  });

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>

      <input
        type="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search dishes..."
        className="w-full border rounded p-2 mb-4"
        aria-label="Search dishes"
      />

      {isPending && !data && <p>Loading dishes...</p>}

      {isError && (
        <p className="text-red-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      )}

      {data && (
        <>
          {isPlaceholderData && (
            <p className="text-gray-500 text-sm mb-2">
              Loading the selected page...
            </p>
          )}

          {data.items.length === 0 ? (
            <p>No dishes found.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {data.items.map((dish) => (
                <div
                  key={dish.id}
                  className="p-4 border rounded shadow-sm"
                >
                  <h3 className="font-bold text-lg">
                    {dish.name} {dish.spicy ? "🌶" : ""}
                  </h3>

                  <p className="text-gray-600">{dish.price} ETB</p>
                  <p className="text-sm text-gray-500">{dish.category}</p>

                  <Link
                    href={`/menu/${dish.id}`}
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View Dish
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="border rounded px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {data.page} of {data.totalPages}
            </span>

            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              disabled={
                page >= data.totalPages || isPlaceholderData
              }
              className="border rounded px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Total dishes: {data.total}
          </p>
        </>
      )}
    </section>
  );
}