import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('@foodspot_cart');
      if (storedCart) setCartItems(JSON.parse(storedCart));
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const addToCart = async (product) => {
    let updated = [...cartItems];
    const index = updated.findIndex((item) => item._id === product._id);

    if (index > -1) {
      updated[index].quantity += 1;
    } else {
      updated.push({ ...product, quantity: 1 });
    }
    setCartItems(updated);
    await AsyncStorage.setItem('@foodspot_cart', JSON.stringify(updated));
  };

  const removeFromCart = async (productId) => {
    const updated = cartItems.filter((item) => item._id !== productId);
    setCartItems(updated);
    await AsyncStorage.setItem('@foodspot_cart', JSON.stringify(updated));
  };

  const clearCart = async () => {
    setCartItems([]);
    await AsyncStorage.removeItem('@foodspot_cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};