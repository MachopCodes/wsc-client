"use client";

import DeleteButton from "@/components/DeleteButton";
import Logo from "@/components/Logo";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interfaces/Product";
import { useSession, signOut, SessionProvider } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

function HomePageContent() {
  const [products, setProducts] = useState<Product[]>([]); // State to store fetched products
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data: session } = useSession();
  useEffect(() => {
    // Fetch products on component mount
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/products/`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductDelete = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  //  add this back later if we want.. add status useSession()
  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Logo></Logo> {/* logo has the background */}
        {session && (
          <button
            onClick={() => signOut()}
            className="absolute z-10 top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        )}
        <section className="p-4 bg-gradient min-h-screen">
          {session && (
            <div className="flex space-x-4">
              <Link href="/add_product">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  Add Product
                </button>
              </Link>
            </div>
          )}
          <ul className="flex flex-col gap-y-4 mt-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="relative flex justify-center items-center"
              >
                {session && (
                  <div className="relative space-x-2 border border-gray-300 rounded-lg shadow-md bg-white p-2 m-2">
                    <Link href={`/products/${product.id}/edit`}>
                      <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                        Edit
                      </button>
                    </Link>
                    <DeleteButton
                      productId={product.id}
                      onDelete={handleProductDelete}
                    />
                  </div>
                )}
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
        <footer className="bg-cover bg-center bg-fade-in text-center text-white py-6">
          <h4 className="text-xl font-semibold text-uppercase mb-2">
            let&apos;s connect
          </h4>
          <a
            href="candreae1@gmail.com"
            className="text-lg flex items-center justify-center gap-2 text-gray-300 hover:text-white transition pb-2"
          >
            <small>candreae1@gmail.com</small>
          </a>
          <div className="flex justify-center items-center">
            <img src="/wscc.png" alt="Logo" className="w-16 object-contain" />
          </div>
          <div className="flex items-center justify-center flex-col ">
            <p className="mt-4 text-center max-w-2xl text-white drop-shadow-lg px-8 py-2">
              Whether you&apos;re looking to showcase your wines to the right buyers
              or partner with exceptional winemakers, we&apos;re here to help
              you connect with those who value craftsmanship as much as you do.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <SessionProvider>
      <HomePageContent />
    </SessionProvider>
  );
}
