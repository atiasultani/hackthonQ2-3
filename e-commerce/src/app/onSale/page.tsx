"use client"
import React, { useEffect, useState } from 'react';
import client from '@/sanity/lib/client'; // Adjust the path based on your file structure
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';

interface Product {
  _id: string;
  mainHeading: string;
  title: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
  product:[]
}

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        {products[0]?.mainHeading || 'ON SALE'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition-shadow"
          >
            {product.imageUrl && (
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={urlFor(product.imageUrl).width(400).height(300).url()}
                  alt={product.title}
                  fill
                  className="rounded-md"
                />
              </div>
            )}
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              {product.title}
            </h2>
            <p className="text-gray-500">Price: ${product.price}</p>
            <p className="text-green-600 font-bold">
              Discounted: ${product.discountedPrice}
            </p>
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnSale;
