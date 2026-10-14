"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
};

const CART_KEY = "addisEatsCart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);

      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsed)) {
          setCart(
            parsed.map((item) => ({
              ...item,
              quantity: Math.max(1, Number(item.quantity) || 1),
              price: Number(item.price) || 0,
            })),
          );
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  function updateCart(updatedCart: CartItem[]) {
    setCart(updatedCart);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  }

  function changeQuantity(id: string | number, amount: number) {
    const updatedCart = cart.map((item) => {
      if (item.id !== id) return item;

      return {
        ...item,
        quantity: Math.max(1, item.quantity + amount),
      };
    });

    updateCart(updatedCart);
  }

  function removeItem(id: string | number) {
    updateCart(cart.filter((item) => item.id !== id));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <main className="cart-page">
        <p>Loading cart...</p>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <section className="empty-cart">
            <h2>Your cart is empty.</h2>
            <p>Add delicious Ethiopian food from our menu!</p>
            <Link href="/menu" className="checkout-button">
              Continue Shopping
            </Link>
          </section>
        ) : (
          <section className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={String(item.id)}>
                <div>
                  <h2>{item.name}</h2>

                  <p>Price: {item.price.toLocaleString()} ETB</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease ${item.name} quantity`}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, 1)}
                      aria-label={`Increase ${item.name} quantity`}>
                      +
                    </button>
                  </div>

                  <p>
                    <strong>
                      Subtotal: {(item.price * item.quantity).toLocaleString()}{" "}
                      ETB
                    </strong>
                  </p>
                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </article>
            ))}

            <div className="cart-total">
              <h2>Total: {total.toLocaleString()} ETB</h2>

              <Link href="/menu" className="continue-button">
                Continue Shopping
              </Link>

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
