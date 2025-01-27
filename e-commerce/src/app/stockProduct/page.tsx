// src/components/ProductDetails.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';

interface ProductStockProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
}

const ProductStock: React.FC<ProductStockProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
}) => {
  const [stock, setStock] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  // Fetch stock information when the page loads
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch(`/api/stock?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch stock');
        const data = await response.json();
        setStock(data.stock);
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    };

    fetchStock();
  }, [id]);

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (stock && stock > 0) {
      setIsLoading(true);

      try {
        // Update stock on the server
        const response = await fetch('/api/stock', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: id,
            stockChange: -1, // Decrease stock by 1
          }),
        });

        if (!response.ok) throw new Error('Failed to update stock');
        const data = await response.json();

        // Update local stock state
        setStock(data.stock.stock);

        // Add the product to the cart
        addToCart({ id, name, price, quantity: 1 });
        alert('Item added to cart!');
      } catch (error) {
        console.error('Error updating stock:', error);
        alert('Failed to add item to cart.');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Sorry, this item is out of stock.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={imageUrl}
          alt={name}
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">${price}</p>
          {stock !== null ? (
            <p
              className={`text-lg font-medium mb-4 ${
                stock > 0 ? 'text-gray-700' : 'text-red-500'
              }`}
            >
              {stock > 0 ? `In Stock: ${stock}` : 'Out of Stock'}
            </p>
          ) : (
            <p className="text-gray-500 mb-4">Loading stock...</p>
          )}
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isLoading || stock === 0}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
          <button
            onClick={() => router.push('/cart')}
            className="ml-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductStock;
