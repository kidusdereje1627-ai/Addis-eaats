import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">☕️ Welcome to Addis Eats</h1>
      <p className="mb-4">Authentic Ethiopian dishes delivered fast.</p>
      <Link href="/menu" className="text-blue-600 hover:underline">
        Browse Menu →
      </Link>
    </main>
  );
}
