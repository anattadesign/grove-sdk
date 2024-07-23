import axios from 'axios';

const cartService = {
  async getCart() {
    try {
      const response = await axios.get('/cart.js');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },
  async addToCart(variantId, quantity = 1) {
    try {
      const response = await axios.post('/cart/add.js', {
        id: variantId,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },
  async updateCart(line, quantity) {
    try {
      const response = await axios.post('/cart/change.js', {
        line,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },
  async removeItem(line) {
    try {
      const response = await axios.post('/cart/change.js', {
        line,
        quantity: 0
      });
      return response.data;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }
};

export default cartService;
