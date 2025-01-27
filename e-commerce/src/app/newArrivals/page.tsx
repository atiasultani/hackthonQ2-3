"use client";
import React, { useEffect, useState } from "react";
import client from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useCart } from '@/components/CartContext'; // Import the useCart hook

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
  return await client.fetch(`*[_type == "products"][5...10] {
    _id,
    mainHeading,
    title,
    price,
    discountedPrice,
    "imageUrl": image.asset->url
  }`).then((products: Product[]) =>
    products.map((product) => ({
      ...product,
      id: product._id, // Map _id to id
      name: product.title, // Map title to name
    }))
  );
};

const NewArrivals:React.FC = () => {
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
      <h1 className="text-2xl font-bold text-center mb-6">
        {products[0]?.mainHeading || "New Arrivals"}
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
          <div className=" w-36 py-1 bg-black  text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-700 transition-all">
            <button onClick={() => addToCart(product)}
               >Add to Cart</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
