// src/components/Cart.tsx

import React from 'react';
import { useCart } from '@/components/CartContext'; 

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, getTotal } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} 
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${getTotal().toFixed(2)}</p>
          {/* Add a "Checkout" button here */}
          <button>Checkout</button> 
        </>
      )}
    </div>
  );
};

export default Cart;