"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";
import { Product } from "@/interfaces/Product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]); // State to store fetched products
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Fetch products on component mount
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/products`);
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
  }, [apiUrl]);

  const handleProductDelete = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-6 text-center">Our Products</h1>
      <Link href="/products/add">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Add Product
        </button>
      </Link>
      <ul className="flex flex-col gap-y-4">
        {products.map((product) => (
          <li key={product.id} className="relative">
            <ProductCard product={product} />
            <div className="absolute top-4 right-4">
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
          </li>
        ))}
      </ul>
    </main>
  );
}
