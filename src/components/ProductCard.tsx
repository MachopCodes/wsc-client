import { ProductCardProps } from "@/interfaces/Product";
import Image from "next/image";

export default function ProductCard({ product }: ProductCardProps) {
  console.log('product', product)
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
        {product.year !== 0 && (
          <p className="text-sm text-gray-600"><b>Year:</b> {product.year}</p>
        )}
        {product.region && (
          <p className="text-sm text-gray-600"><b>Region:</b> {product.region}</p>
        )}
        {product.type && (
          <p className="text-sm text-gray-600"><b>Type:</b> {product.type}</p>
        )}
        {/* {product.price !== undefined && (
          <p className="text-lg font-semibold text-gray-800 mt-2">
            ${Number(product.price).toFixed(2)}
          </p>
        )} */}
        {product.serving_temperature && (
          <p className="text-sm text-gray-600">
            <b>Serving Temperature:</b> {product.serving_temperature}°f
          </p>
        )}
        {product.food_pairings && (
          <p className="text-sm text-gray-600">
            <b>Food Pairings:</b> {product.food_pairings}
          </p>
        )}
        {product.grape_varietals && (
          <p className="text-sm text-gray-600">
            <b>Grape Varietals:</b> {product.grape_varietals}
          </p>
        )}
        {product.ageing_process && (
          <p className="text-sm text-gray-600">
            <b>Ageing Process:</b> {product.ageing_process}
          </p>
        )}
        {product.tasting_notes && (
          <p className="text-sm text-gray-600">
            <b>Tasting Notes:</b> {product.tasting_notes}
          </p>
        )}
        {product.location_notes && (
          <p className="text-sm text-gray-600">
            <b>Location Notes:</b> {product.location_notes}
          </p>
        )}
        {product.brand_description && (
          <p className="text-sm text-gray-600">
            <b>Brand Description:</b> {product.brand_description}
          </p>
        )}
        {product.winemaker_notes && (
          <p className="text-sm text-gray-600">
            <b>Winemaker Notes:</b> {product.winemaker_notes}
          </p>
        )}
        {product.harvesting_technique && (
          <p className="text-sm text-gray-600">
            <b>Harvesting Technique:</b> {product.harvesting_technique}
          </p>
        )}
        <p className="text-gray-700 mt-4 line-clamp-3">{product.description}</p>
      </div>
    </div>
  );
}
