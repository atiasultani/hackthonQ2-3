import React from 'react';
import Link from 'next/link';

// Define Product interface
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

// Function to fetch products
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://template1-neon-nu.vercel.app/api/products', {
      cache: 'no-store', // Prevent caching if live data is required
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// ProductCard Component
const ProductCard: React.FC<Product> = ({ _id, title, price, description, imageUrl }) => {
  return (
    <Link href={`/products/${_id}`}>
      <a className="block rounded-lg border shadow-md p-4 bg-white hover:shadow-lg transition-shadow">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <p className="text-base font-bold text-green-600">${price.toFixed(2)}</p>
      </a>
    </Link>
  );
};

// Shop Component
const Shop = async () => {
  const products = await fetchProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              title={product.title}
              description={product.description}
              price={product.price}
              category={product.category}
              imageUrl={product.imageUrl}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
