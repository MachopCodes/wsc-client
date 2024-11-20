interface Product {
  id: number;
  name: string;
  year?: number;
  region?: string;
  type?: string;
  price?: string;
  image?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md bg-white max-w-md overflow-hidden">
        {product.image && (
        <div className="w-auto h-auto">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-auto max-w-full"
          />
        </div>
      )}
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
