"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("addisEatsCart");

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  function removeItem(id: number | string) {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("addisEatsCart", JSON.stringify(updatedCart));
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0,
  );

  if (loading) {
    return <main className="cart-page">Loading cart...</main>;
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <section className="empty-cart">
            <h2>Your cart is empty.</h2>
            <p>Add delicious Ethiopian food from our menu!</p>
            <Link href="/menu">Continue Shopping</Link>
          </section>
        ) : (
          <section className="cart-items">
            {cart.map((item, index) => (
              <article className="cart-item" key={`${item.id}-${index}`}>
                <div>
                  <h2>{item.name}</h2>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Price: {Number(item.price).toLocaleString()} ETB</p>
                  <strong>
                    Subtotal:{" "}
                    {(
                      Number(item.price) * Number(item.quantity || 1)
                    ).toLocaleString()}{" "}
                    ETB
                  </strong>
                </div>

                <button type="button" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </article>
            ))}

            <div className="cart-total">
              <h2>Total: {total.toLocaleString()} ETB</h2>
              <Link href="/checkout" className="checkout-button">
                Proceed to Checkout
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
