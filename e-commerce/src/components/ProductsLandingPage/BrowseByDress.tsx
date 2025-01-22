import React from 'react';
import client from '@/sanity/lib/client'; // Adjust the path based on your file structure
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

// Define the Product type
interface Product {
  title: string;
  imageUrl: string;
}

// Fetch data from Sanity
const getData = async (): Promise<Product[]> => {
  const response = await client.fetch(
    `*[_type == "browseDress"]{
      title,
      "imageUrl": image.asset->url
    }`
  );
  return response;
};

// ProductCard Component
const ProductCard: React.FC<Product> = ({ title, imageUrl }) => (
  <div className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <div className="w-full h-48 relative mb-4">
      {imageUrl ? (
        <Image
          src={urlFor(imageUrl).width(400).height(300).url()}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-md"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
    </div>
    <h2 className="text-sm font-medium text-gray-800 text-center">{title || 'Untitled'}</h2>
  </div>
);

// BrowseDress Component
const BrowseDress = async () => {
  const products = await getData();

  return (
    <div className="bg-gray-100 min-h-screen py-8 ">
      <h1 className="text-3xl font-bold text-center mb-8">Browse Dresses</h1>
      <div className="container mx-auto grid grid-cols-2 grid-rows-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={index} title={product.title} imageUrl={product.imageUrl} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No dresses available.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseDress;
