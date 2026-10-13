"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type OrderItem = {
  id?: string | number;
  name?: string;
  dishName?: string;
  title?: string;
  price?: number | string;
  quantity?: number;
  qty?: number;
};

type Order = {
  id: string | number;
  items?: OrderItem[];
  total?: number | string;
  status?: string;
  date?: string;
  name?: string;
  dishName?: string;
  price?: number | string;
  quantity?: number;
};

function getName(item: OrderItem) {
  return item.name || item.dishName || item.title || "Food Item";
}

function getQuantity(item: OrderItem) {
  return Math.max(1, Number(item.quantity ?? item.qty ?? 1) || 1);
}

function getItemTotal(item: OrderItem) {
  return Math.max(0, Number(item.price) || 0) * getQuantity(item);
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("addisEatsOrders");

      if (savedOrders) {
        const parsedOrders: unknown = JSON.parse(savedOrders);

        if (!Array.isArray(parsedOrders)) {
          throw new Error("Invalid orders data");
        }

        setOrders(parsedOrders as Order[]);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError("Could not load orders. Please check your saved data.");
    } finally {
      setLoading(false);
    }
  }, []);

  function removeOrder(id: string | number) {
    try {
      const updatedOrders = orders.filter((order) => order.id !== id);

      localStorage.setItem("addisEatsOrders", JSON.stringify(updatedOrders));

      setOrders(updatedOrders);
      setError("");
    } catch (err) {
      console.error("Failed to remove order:", err);
      setError("Could not remove this order.");
    }
  }

  if (loading) {
    return (
      <main className="orders-container">
        <p>Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="orders-container">
      <header className="orders-header">
        <h1>My Orders</h1>
        <p>View and manage your Addis Eats food orders.</p>
      </header>

      {error && <p role="alert">{error}</p>}

      {orders.length === 0 ? (
        <section className="empty-orders">
          <div className="empty-icon">🍽️</div>
          <h2>No Orders Yet</h2>
          <p>
            You have not placed any orders yet. Explore our menu and choose your
            favorite food.
          </p>
          <Link href="/menu" className="order-button">
            Explore Menu
          </Link>
        </section>
      ) : (
        <section className="orders-list">
          <h2>Your Orders ({orders.length})</h2>

          {orders.map((order, index) => {
            const items =
              Array.isArray(order.items) && order.items.length > 0
                ? order.items
                : [
                    {
                      name: order.name || order.dishName || "Food Item",
                      price: order.price ?? 0,
                      quantity: order.quantity ?? 1,
                    },
                  ];

            const calculatedTotal = items.reduce(
              (sum, item) => sum + getItemTotal(item),
              0,
            );

            const orderTotal =
              order.total !== undefined && order.total !== null
                ? Number(order.total) || 0
                : calculatedTotal;

            return (
              <article className="order-card" key={order.id ?? index}>
                <div className="order-card-header">
                  <h3>Order #{order.id}</h3>
                  <span className="order-status">
                    {order.status || "Pending"}
                  </span>
                </div>

                <div className="order-details">
                  {items.map((item, itemIndex) => (
                    <div key={item.id ?? itemIndex}>
                      <p>
                        <strong>Food:</strong> {getName(item)}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {getQuantity(item)}
                      </p>
                      <p>
                        <strong>Price:</strong>{" "}
                        {(Number(item.price) || 0).toLocaleString()} ETB
                      </p>
                      <p>
                        <strong>Subtotal:</strong>{" "}
                        {getItemTotal(item).toLocaleString()} ETB
                      </p>
                    </div>
                  ))}

                  <p>
                    <strong>Total:</strong> {orderTotal.toLocaleString()} ETB
                  </p>

                  {order.date && (
                    <p>
                      <strong>Date:</strong> {order.date}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => removeOrder(order.id)}>
                  Remove Order
                </button>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
