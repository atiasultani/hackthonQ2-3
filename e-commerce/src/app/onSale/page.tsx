'use client';
import React, { useEffect, useState } from 'react';
import client from '@/sanity/lib/client';
import Image from 'next/image';
import { Product } from '@/components/types'; // Import the Product type
import { useCart } from '@/components/CartContext'; // Import the useCart hook

const fetchProducts = async (): Promise<Product[]> => {
  return await client.fetch(`*[_type == "products"][8...15] {
    _id,
    mainHeading,
    title,
    price,
    discountedPrice,
    "imageUrl": image.asset->url
  }`);
};

const OnSale: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">On Sale</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Image
              src={product.imageUrl}
              alt={`Image of ${product.title}`}
              width={300}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.mainHeading}</p>
              <p className="text-gray-800 font-bold">Price: ${product.price}</p>
              <p className="text-green-500 font-bold">Discounted Price: ${product.discountedPrice}</p>
            </div>
            <div className='flex justify-center mb-4  w-36 py-1 bg-black  text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-700 transition-all'>
            <button 
              onClick={() => addToCart(product)}            >
              Add to Cart
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnSale;