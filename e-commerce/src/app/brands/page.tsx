"use client";

import React, { useEffect, useState } from "react";
import client from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  brand: string;
  category: string;
  imageUrl: string;
}

const BrandPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "products"][0...20]{
          _id,
          name,
          price,
          brand,
          category,
          "imageUrl": image.asset->url
        }`;

        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading products...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Brand: Nike</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              {product.imageUrl && (
                <div className="w-full h-48 relative mb-4">
                  <Image
                    src={urlFor(product.imageUrl).width(400).height(300).url()}
                    alt={product.name}
                    fill
                    className="rounded-md"
                  />
                </div>
              )}

              {/* Product Info */}
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {product.name}
              </h2>
              <p className="text-gray-500 text-center">
                Category: {product.category}
              </p>
              <p className="text-green-600 font-bold text-center">
                Price: ${product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandPage;
