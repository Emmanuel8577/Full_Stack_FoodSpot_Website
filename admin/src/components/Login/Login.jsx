import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Real login attempt to your Render backend
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Welcome back, Admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Admin Credentials");
    }
  };

  // Dummy Google Login Function
  const dummyGoogleLogin = () => {
    toast.info("Google Auth is in Dummy Mode");
    // In a real scenario, this would redirect/popup. 
    // For now, let's just log in with a fake token if you want to skip the form:
    // setToken("dummy_admin_token_123"); 
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white shadow-xl rounded-[2.5rem] p-10 max-w-md w-full border border-gray-100'>
        
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-black text-gray-900 uppercase italic tracking-tighter'>
            Admin <span className='text-orange-600'>Panel</span>
          </h1>
          <p className='text-gray-400 text-sm font-medium mt-2'>Chuks Kitchen Management</p>
        </div>
        
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-xs font-bold text-gray-500 ml-1 uppercase'>Email Address</p>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              className='rounded-2xl w-full px-5 py-4 bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
              type="email" 
              placeholder="admin@example.com" 
              required 
            />
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-xs font-bold text-gray-500 ml-1 uppercase'>Password</p>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              className='rounded-2xl w-full px-5 py-4 bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
              type="password" 
              placeholder="Enter Password" 
              required 
            />
          </div>

          <button type='submit' className='mt-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 active:scale-95'>
            Login
          </button>
        </form>

        <div className='my-8 flex items-center gap-4 text-gray-200'>
          <hr className='flex-1' /> <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>OR</span> <hr className='flex-1' />
        </div>

        {/* Dummy Google Button */}
        <button 
          onClick={dummyGoogleLogin}
          className='w-full py-4 border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-95'
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className='w-5' alt="Google" />
          <span className='text-sm font-bold text-gray-700'>Sign in with Google</span>
        </button>

      </div>
    </div>
  );
};

export default Login;