import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// Define the Product interface
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

// Fetch product by ID
const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`https://template1-neon-nu.vercel.app/api/products/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Dynamic Page Component
const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const product = await fetchProductById(id);

  if (!product) {
    notFound(); // Redirect to the 404 page if the product is not found
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={800}
            height={600}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold text-green-600 mb-2">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
