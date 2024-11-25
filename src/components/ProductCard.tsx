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
            width={200}
            height={200}
          />
        )}
      </div>

      {/* Right Column: Product Details */}
      <div className="p-4">
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
        <p className="text-gray-700 mt-4 line-clamp-3">{product.description}</p>
      </div>
    </div>
  );
}
