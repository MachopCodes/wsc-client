"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface ProductFormProps {
  initialValues?: {
    name?: string;
    year?: string | number;
    region?: string;
    type?: string;
    price?: string | number;
    image?: string;
    description?: string;
  };
  onSubmit: (form: {
    name: string;
    year?: string;
    region?: string;
    type?: string;
    price?: string;
    image?: string;
    description?: string;
  }) => void;
}

export default function ProductForm({
  initialValues,
  onSubmit,
}: ProductFormProps) {
  const [form, setForm] = useState({
    name: initialValues?.name || "",
    year: initialValues?.year?.toString() || "",
    region: initialValues?.region || "",
    type: initialValues?.type || "",
    price: initialValues?.price?.toString() || "",
    image: initialValues?.image || "",
    description: initialValues?.description || "",
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (result: any) => {
    if (result.event === "success") {
      setForm({ ...form, image: result.info.secure_url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-6 text-center">
        {initialValues ? "Edit" : "Add"} Product
      </h1>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Region"
        value={form.region}
        onChange={(e) => setForm({ ...form, region: e.target.value })}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Type"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="p-2 border border-gray-300 rounded"
      ></textarea>
      <CldUploadWidget uploadPreset="ws_craft" onSuccess={handleImageUpload}>
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>
      {form.image && (
        <div className="mt-2">
          <p>Uploaded Image:</p>
          <img
            src={form.image}
            alt="Uploaded"
            className="w-32 h-32 object-cover mt-2"
          />
        </div>
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={uploading}
      >
        {initialValues ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
