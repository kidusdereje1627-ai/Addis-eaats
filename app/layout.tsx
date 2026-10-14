import type { Metadata } from "next";
import Link from "next/link";
import Providers from "./components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Addis Eats",
  description: "Ethiopian food ordering app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-6 max-w-4xl mx-auto font-sans">
        <Providers>
          <nav className="flex gap-4 pb-4 mb-6 border-b border-gray-200">
            <Link href="/" className="hover:underline">
              Home
            </Link>

            <Link href="/menu" className="hover:underline">
              Menu
            </Link>

            <Link href="/cart" className="hover:underline">
              Cart
            </Link>

            <Link href="/checkout" className="hover:underline">
              Checkout
            </Link>
          </nav>

          {children}
        </Providers>
      </body>
    </html>
  );
}
