import React, { useRef, useState } from 'react';
import CartDrawer from './components/CartDrawer';
import AddToCartButton from './components/AddToCartButton';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartDrawerRef = useRef();

  const updateCart = () => {
    if (cartDrawerRef.current) {
      cartDrawerRef.current.fetchCart();
    }
  };

  const openCartDrawer = () => {
    setIsCartOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="p-4">
      <button onClick={openCartDrawer} className="bg-blue-500 text-white px-4 py-2 rounded">Open Cart</button>
      <CartDrawer ref={cartDrawerRef} isOpen={isCartOpen} closeDrawer={closeCartDrawer} />
      <AddToCartButton variantId="your-variant-id" onCartUpdated={updateCart} />
    </div>
  );
}

export default App;
