"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { ProductEditForm } from "@/interfaces/Product";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams(); // Access the dynamic route parameter
  const [product, setProduct] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}/`); // Use the `id` from useParams
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleEditProduct = async (form: ProductEditForm) => {
    const res = await fetch(`/api/products/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Product edited successfully!");
      router.push("/products");
    } else {
      alert("Failed to add product");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <BackButton href="/products" label="Back to Products"></BackButton>
      <ProductForm initialValues={product} onSubmit={handleEditProduct} />
    </div>
  );
}
