import React, { useState, useEffect, useContext } from 'react'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Order from './pages/Order/Order'
import { Routes, Route } from "react-router-dom"
import Footer from './components/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import Verify from './components/Verify'

import { FoodContext } from './context/FoodContext'
import ServerLoader from './components/ServerLoader'
import axios from 'axios'

const App = () => {
  const [isServerLoading, setIsServerLoading] = useState(true);
  
  // FIXED: Ensure fetchProductsList is properly pulled from your context here
  const { url, fetchProductsList } = useContext(FoodContext);

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        // 1. Ping the backend to check if it's awake
        await axios.get(`${url}/health`);
        
        // 2. Load the catalog data instantly now that the server is warm
        await fetchProductsList();
        
        // 3. Take down the server spinner screen
        setIsServerLoading(false); 
      } catch (error) {
        console.error("Error waking up server:", error);
        setIsServerLoading(false); // Fallback to let user see UI if a timeout happens
      }
    };

    wakeUpServer();
  }, [url, fetchProductsList]); // FIXED: Added fetchProductsList to the dependency array

  // Render the loader exclusively if the backend is waking up
  if (isServerLoading) {
    return (
      <>
        <ToastContainer />
        <ServerLoader />
      </>
    );
  }

  return (
    <div>
      <ToastContainer />
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/orders" element={<Order/>}/>
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App