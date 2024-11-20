"use client";

import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function AddProductPage() {
  const router = useRouter();

  const handleAddProduct = async (form: any) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Product added successfully!");
      router.push("/products");
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <main className="p-8">
      <BackButton href="/products" label="Back to Products"></BackButton>
      <ProductForm onSubmit={handleAddProduct} />
    </main>
  );
}
