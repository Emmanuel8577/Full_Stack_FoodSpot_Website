import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Users from './pages/Users' 
import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- THE FIX IS HERE ---
// This will use your Render URL on Vercel and fallback to localhost only if the variable is missing
export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; 
export const currency = "₦"; 

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === "" 
        ? <Login setToken={setToken} url={backendUrl} /> // Added url prop to Login too!
        : <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex items-start w-full'>
              <Sidebar />
              <div className='flex-1 p-8 sm:p-12'>
                <Routes>
                  <Route path='/' element={<Navigate to="/add" />} />
                  <Route path='/add' element={<Add token={token} url={backendUrl} />} />
                  <Route path='/list' element={<List token={token} url={backendUrl} />} />
                  <Route path='/orders' element={<Orders token={token} url={backendUrl} />} />
                  <Route path='/users' element={<Users token={token} url={backendUrl} />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default App