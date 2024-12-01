import { ProductCardProps } from "@/interfaces/Product";
import Image from "next/image";

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md bg-white bg-opacity-80 w-full overflow-hidden grid grid-cols-2">
      {/* Left Column: Image */}
      <div className="flex items-center justify-center p-4 bg-gray-100">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-auto"
            width={300}
            height={300}
            style={{
              maxHeight: "450px",
              height: "auto",
              width: "auto",
            }}
          />
        )}
      </div>

      {/* Right Column: Product Details */}
      <div className="p-8 text-left">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        {product.year && (
          <p className="text-sm text-gray-600">Year: {product.year}</p>
        )}
        {product.region && (
          <p className="text-sm text-gray-600">Region: {product.region}</p>
        )}
        {product.type && (
          <p className="text-sm text-gray-600">Type: {product.type}</p>
        )}
        {product.price !== undefined && (
          <p className="text-lg font-semibold text-gray-800 mt-2">
            ${Number(product.price).toFixed(2)}
          </p>
        )}
        {product.serving_temperature && (
          <p className="text-sm text-gray-600">
            Serving Temperature: {product.serving_temperature}°f
          </p>
        )}
        {product.food_pairings && (
          <p className="text-sm text-gray-600">
            Food Pairings: {product.food_pairings}
          </p>
        )}
        {product.grape_varietals && (
          <p className="text-sm text-gray-600">
            Grape Varietals: {product.grape_varietals}
          </p>
        )}
        {product.ageing_process && (
          <p className="text-sm text-gray-600">
            Ageing Process: {product.ageing_process}
          </p>
        )}
        {product.tasting_notes && (
          <p className="text-sm text-gray-600">
            Tasting Notes: {product.tasting_notes}
          </p>
        )}
        {product.location_notes && (
          <p className="text-sm text-gray-600">
            Location Notes: {product.location_notes}
          </p>
        )}
        {product.brand_description && (
          <p className="text-sm text-gray-600">
            Brand Description: {product.brand_description}
          </p>
        )}
        {product.winemaker_notes && (
          <p className="text-sm text-gray-600">
            Winemaker Notes: {product.winemaker_notes}
          </p>
        )}
        {product.harvesting_technique && (
          <p className="text-sm text-gray-600">
            Harvesting Technique: {product.harvesting_technique}
          </p>
        )}
        <p className="text-gray-700 mt-4 line-clamp-3">{product.description}</p>
      </div>
    </div>
  );
}
