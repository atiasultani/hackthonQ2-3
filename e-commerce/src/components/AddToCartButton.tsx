import React from 'react';

interface Product {
  title: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
  product:[]
}

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${product.title} to cart`);
  };

  return (
    <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 rounded">
      Add to Cart
    </button>
  );
};

export default AddToCartButton;