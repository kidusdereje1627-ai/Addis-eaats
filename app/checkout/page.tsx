"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id?: string | number;
  name?: string;
  dishName?: string;
  title?: string;
  price: number | string;
  quantity?: number;
  qty?: number;
};

type Order = {
  id: number;
  items: CartItem[];
  total: number;
  status: string;
  date: string;
};

function getItemName(item: CartItem) {
  return item.name || item.dishName || item.title || "Food Item";
}

function getQuantity(item: CartItem) {
  return Math.max(1, Number(item.quantity ?? item.qty ?? 1) || 1);
}

function getItemTotal(item: CartItem) {
  return Math.max(0, Number(item.price) || 0) * getQuantity(item);
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("addisEatsCart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setMessage("Could not load your cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + getItemTotal(item), 0);

  function handlePlaceOrder() {
    if (cart.length === 0) {
      setMessage("Your cart is empty!");
      return;
    }

    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("addisEatsOrders") || "[]",
      );

      if (!Array.isArray(savedOrders)) {
        throw new Error("Invalid orders data");
      }

      const newOrder: Order = {
        id: Date.now(),
        items: cart.map((item) => ({ ...item })),
        total,
        status: "Pending",
        date: new Date().toLocaleString(),
      };

      const updatedOrders = [...savedOrders, newOrder];

      localStorage.setItem("addisEatsOrders", JSON.stringify(updatedOrders));

      localStorage.removeItem("addisEatsCart");
      setCart([]);
      setMessage("Order placed successfully!");
    } catch (error) {
      console.error("Order error:", error);
      setMessage("Failed to place your order. Please try again.");
    }
  }

  if (loading) {
    return (
      <main className="checkout-container">
        <p>Loading checkout...</p>
      </main>
    );
  }

  return (
    <main className="checkout-container">
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <section>
          <p>Your cart is empty.</p>
          <Link href="/menu">Browse Menu</Link>
        </section>
      ) : (
        <section>
          <h2>Order Summary</h2>

          {cart.map((item, index) => (
            <article key={item.id ?? index}>
              <h3>{getItemName(item)}</h3>
              <p>Quantity: {getQuantity(item)}</p>
              <p>Price: {(Number(item.price) || 0).toLocaleString()} ETB</p>
              <p>Subtotal: {getItemTotal(item).toLocaleString()} ETB</p>
            </article>
          ))}

          <h2>Total: {total.toLocaleString()} ETB</h2>

          <button type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </section>
      )}

      {message && <p role="status">{message}</p>}

      {message === "Order placed successfully!" && (
        <Link href="/orders">View My Orders</Link>
      )}
    </main>
  );
}
