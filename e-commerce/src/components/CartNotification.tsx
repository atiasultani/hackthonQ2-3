import React, { useState, useEffect } from 'react';
import { useCart } from '@/components/CartContext';
import Product from '@/components/types';

interface CartContextType {
  cartItems: Product[];} // Define the CartContextType interface

const CartNotification: React.FC = () => {
  const { cartItems }: { cartItems:Product[] } = useCart(); // Explicitly define cartItems type
  const [showNotification, setShowNotification] = useState(false);
  const [previousCount, setPreviousCount] = useState<number>(0); // Explicitly set number type

  // Calculate the total number of items in the cart
  const totalCount = cartItems.reduce((acc: number, item:any) => acc + item.quantity, 0);

  useEffect(() => {
    // Show notification only when the cart item count increases
    if (totalCount > previousCount) {
      setShowNotification(true);

      // Hide notification after 3 seconds
      const timeout = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [totalCount, previousCount]); // Run when totalCount or previousCount changes

  useEffect(() => {
    // Update the previous count after the notification logic runs
    setPreviousCount(totalCount);
  }, [totalCount]);

  return (
    <div className="fixed top-4 right-4 z-50">
      {showNotification && (
        <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          ✅ Item added to cart! Total items: {totalCount}
        </div>
      )}
    </div>
  );
};

export default CartNotification;
