import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const FoodContext = createContext();

const FoodContextProvider = (props) => {
  // --- MOVE THIS LINE HERE (Inside the component) ---
  const navigate = useNavigate();

  const currency = "₦";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
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
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        // We check for .orders OR .data to be safe
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

  const fetchProductsList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/food/list`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchProductsList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
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
    orders, // Added this so Orders.jsx can access the state
    getUserOrders,
    setCartItems,
    getCartAmount,
    url: backendUrl,
    token,
    setToken,
  };

  return (
    <FoodContext.Provider value={value}>{props.children}</FoodContext.Provider>
  );
};

export default FoodContextProvider;
