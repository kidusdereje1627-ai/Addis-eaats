import Link from 'next/link';

export default function CartPage() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
      <p className="mb-6">Your cart is empty.</p>
      <Link href="/" className="text-blue-600 underline">
        Continue shopping
      </Link>
    </main>
  );
}
