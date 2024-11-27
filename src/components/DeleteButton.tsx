"use client";

interface DeleteButtonProps {
  productId: number;
  onDelete: (id: number) => void; // Callback to update the parent component
}

export default function DeleteButton({ productId, onDelete }: DeleteButtonProps) {
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/products/${productId}/`, { method: "DELETE" });

      if (res.ok) {
        alert(`Product with ID ${productId} deleted successfully`);
        onDelete(productId); // Notify the parent component to update its state
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Delete
    </button>
  );
}
