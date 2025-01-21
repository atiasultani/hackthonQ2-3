"use client"

import React from 'react';
import {useCart} from "@/components/CartContext"; // Import useCart hook

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
