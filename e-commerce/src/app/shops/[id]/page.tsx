import React from 'react';
import { GetServerSideProps } from 'next';

// Define Product interface
interface Product {
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

// ProductPage Component
const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  if (!product) {
    return <p className="text-center text-gray-500">Product not found.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="w-full h-96 relative mb-6">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-bold text-green-600 mb-4">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
      </div>
    </div>
  );
};

// Fetch product data for the given ID
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const response = await fetch(`https://template1-neon-nu.vercel.app/api/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const product = await response.json();
    return { props: { product } };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { props: { product: null } };
  }
};

export default ProductPage;
