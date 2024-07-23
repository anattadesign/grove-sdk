import React, { useState, useEffect } from 'react';
import cartService from '../services/cartService';

const CartDrawer = ({ isOpen, closeDrawer }) => {
  const [cart, setCart] = useState({ items: [], total_price: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error) {
      setError('Failed to load cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (line) => {
    try {
      await cartService.removeItem(line);
      fetchCart();
    } catch (error) {
      setError('Failed to remove item. Please try again later.');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex justify-end ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-gray-900 bg-opacity-50 w-full h-full" onClick={closeDrawer}></div>
      <div className="bg-white w-80 h-full shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {cart.items.length === 0 && <div>Your cart is empty</div>}
        <ul>
          {cart.items.map((item, index) => (
            <li key={item.id} className="flex justify-between items-center mb-4">
              <div>
                {item.title} - {item.quantity} x ${(item.price / 100).toFixed(2)}
              </div>
              <button onClick={() => removeItem(index + 1)} className="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${(cart.total_price / 100).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartDrawer;
