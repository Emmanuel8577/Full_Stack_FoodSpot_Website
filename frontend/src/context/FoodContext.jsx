import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const FoodContext = createContext();

const FoodContextProvider = (props) => {
  const navigate = useNavigate();

  // Define the base URL using Vite's environment variable
  const url = import.meta.env.VITE_BACKEND_URL || "https://foodspot-backend.onrender.com";
  
  const currency = "₦";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState([]);

  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("chuks_food_cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("chuks_food_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    toast.success("Added to cart!", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (quantity <= 0) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] = quantity;
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("chuks_food_cart");
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    if (products.length === 0) return 0;
    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);
      if (itemInfo && cartItems[item] > 0) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    }
    return totalCount;
  };

  const getUserOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        const fetchedOrders = response.data.orders || response.data.data;
        console.log("Orders extracted:", fetchedOrders);

        if (fetchedOrders) {
          setOrders(fetchedOrders);
        } else {
          console.error(
            "Backend success was true, but no order array found in response keys 'orders' or 'data'",
          );
        }
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  // Exposed so App.jsx or pages can trigger it safely once the server is verified awake
  const fetchProductsList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
  };

  // Synchronously load the token on mount (safe to keep here)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const value = {
    products,
    currency,
    cartItems,
    addToCart,
    navigate,
    updateQuantity,
    clearCart,
    getCartCount,
    orders,
    getUserOrders,
    setCartItems,
    getCartAmount,
    fetchProductsList,// Added to value so App.jsx can invoke it right after waking the server
    url,
    token,
    setToken,
  };

  return (
    <FoodContext.Provider value={value}>{props.children}</FoodContext.Provider>
  );
};

export default FoodContextProvider;