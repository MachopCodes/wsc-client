export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the W&S Craft Connections</h1>
        <p className="text-lg text-foreground">
          Explore our selection of wines and spirits.
        </p>
        <a
          href="/products"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          View Products
        </a>
      </div>
    </main>
  );
}
