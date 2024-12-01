"use client";

import { useState } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { ProductEditForm } from "@/interfaces/Product";

interface ProductFormProps {
  initialValues?: ProductEditForm;
  onSubmit: (form: ProductEditForm) => void;
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
    serving_temperature: initialValues?.serving_temperature || "",
    food_pairings: initialValues?.food_pairings || "",
    grape_varietals: initialValues?.grape_varietals || "",
    ageing_process: initialValues?.ageing_process || "",
    tasting_notes: initialValues?.tasting_notes || "",
    location_notes: initialValues?.location_notes || "",
    brand_description: initialValues?.brand_description || "",
    winemaker_notes: initialValues?.winemaker_notes || "",
    harvesting_technique: initialValues?.harvesting_technique || "",
  });

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === "success" &&
      typeof result.info !== "string" &&
      result.info?.secure_url
    ) {
      setForm({ ...form, image: result.info.secure_url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="flex gap-8 items-center" onSubmit={handleSubmit}>
      {/* Left Column: Image and Upload Button */}
      <div className="flex flex-col items-center gap-4">
        {form.image && (
          <div>
            <Image
              src={form.image}
              alt={form.name}
              className="object-contain"
              width={300}
              height={300}
              style={{
                maxHeight: "450px",
                height: "auto",
                width: "auto",
              }}
            />
          </div>
        )}
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
      </div>

      {/* Right Column: Form Fields */}
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {initialValues ? "Edit" : "Add"} Product
        </h1>

        {/** Form Fields */}
        {[
          { id: "name", label: "Name", type: "text", value: form.name },
          { id: "year", label: "Year", type: "number", value: form.year },
          { id: "region", label: "Region", type: "text", value: form.region },
          { id: "type", label: "Type", type: "text", value: form.type },
          { id: "price", label: "Price", type: "number", value: form.price },
          {
            id: "serving_temperature",
            label: "Serving Temperature (F)",
            type: "text",
            value: form.serving_temperature,
          },
          {
            id: "food_pairings",
            label: "Food Pairings",
            type: "text",
            value: form.food_pairings,
          },
          {
            id: "grape_varietals",
            label: "Grape Varietals",
            type: "text",
            value: form.grape_varietals,
          },
          {
            id: "ageing_process",
            label: "Ageing Process",
            type: "text",
            value: form.ageing_process,
          },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block mb-1 font-semibold">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={field.value}
              onChange={(e) =>
                setForm({ ...form, [field.id]: e.target.value })
              }
              placeholder={field.label}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        ))}

        {/** Textareas */}
        {[
          { id: "description", label: "Description", value: form.description },
          {
            id: "tasting_notes",
            label: "Tasting Notes",
            value: form.tasting_notes,
          },
          {
            id: "location_notes",
            label: "Location Notes",
            value: form.location_notes,
          },
          {
            id: "brand_description",
            label: "Brand Description",
            value: form.brand_description,
          },
          {
            id: "winemaker_notes",
            label: "Winemaker Notes",
            value: form.winemaker_notes,
          },
          {
            id: "harvesting_technique",
            label: "Harvesting Technique",
            value: form.harvesting_technique,
          },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block mb-1 font-semibold">
              {field.label}
            </label>
            <textarea
              id={field.id}
              value={field.value}
              onChange={(e) =>
                setForm({ ...form, [field.id]: e.target.value })
              }
              placeholder={field.label}
              className="p-2 border border-gray-300 rounded w-full"
            ></textarea>
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {initialValues ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
