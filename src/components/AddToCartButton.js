import React from 'react';
import cartService from '../services/cartService';

const AddToCartButton = ({ variantId, onCartUpdated }) => {
  const addToCart = async () => {
    try {
      await cartService.addToCart(variantId);
      onCartUpdated();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <button onClick={addToCart} className="bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
  );
};

export default AddToCartButton;
