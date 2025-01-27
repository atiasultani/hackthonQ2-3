"use client";
import React, { useEffect, useState } from "react";
import client from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Product {
  _id: string;
  id: string; // Include 'id' for AddToCartButton compatibility
  name: string; // Include 'name' for AddToCartButton compatibility
  mainHeading: string;
  title: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
}

// Fetch products from Sanity CMS
const fetchProducts = async (): Promise<Product[]> => {
  return await client
    .fetch(
      `*[_type == "products"][*]{
        _id,
        mainHeading,
        title,
        price,
        discountedPrice,
        "imageUrl": image.asset->url
      }`
    )
    .then((products: Product[]) =>
      products.map((product) => ({
        ...product,
        id: product._id, // Map _id to id
        name: product.title, // Map title to name
      }))
    );
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">All Products List</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <ul className="list-disc list-inside">
          {products.map((product) => (
            <li
              key={product._id}
              className="border rounded-lg p-4 mb-4 bg-white shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center">
                {product.imageUrl && (
                  <div className="w-32 h-32 relative mb-4">
                    <Image
                      src={urlFor(product.imageUrl).width(128).height(128).url()}
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
