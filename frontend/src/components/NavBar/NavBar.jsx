import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCart, BiUser } from "react-icons/bi";
import { FoodContext } from "../../context/FoodContext";
import { FaCentos } from "react-icons/fa";

const NavBar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Pull token and logout logic from context
  const { getCartCount, token, setToken, setCartItems } = useContext(FoodContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1500); // Reduced slightly for better UX
  };

  return (
    <div className="relative border-b border-gray-100 bg-white sticky top-0 z-[100]">
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[999]">
          <FaCentos className="text-[80px] animate-spin text-brand-red" />
        </div>
      )}

      <nav className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto gap-2">
        
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/">
            <h2 className="text-xl md:text-[30px] font-black font-roboto italic tracking-tighter">
              FOOD<span className="text-brand-red">SPOT</span>
            </h2>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex flex-grow max-w-[500px] mx-5">
          <input
            type="text"
            className="flex-grow p-2 md:p-[10px] border-2 border-gray-100 focus:border-brand-red rounded-l-full outline-none text-xs md:text-sm transition-all"
            placeholder="Search for delicacies..."
          />
          <button className="bg-brand-red text-white px-5 md:px-[20px] py-2 md:py-[10px] rounded-r-full font-bold text-xs md:text-sm hover:bg-red-700 transition-colors">
            SEARCH
          </button>
        </div>

        {/* Actions Area */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Cart Icon */}
          <button 
            className="relative flex items-center group" 
            onClick={() => handleNavigation("/cart")}
          >
            <BiCart className="text-3xl md:text-[38px] cursor-pointer group-hover:text-brand-red transition-colors" />
            <span className="absolute -top-1 -right-1 bg-brand-red text-white rounded-full text-[10px] px-1.5 py-0.5 min-w-[20px] text-center font-black shadow-lg">
              {getCartCount()}
            </span>
          </button>

          {/* Authentication Logic */}
          {!token ? (
            // Show Login Button if NOT logged in
            <button 
              onClick={() => navigate('/login')}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-red transition-all active:scale-95 shadow-md"
            >
              Login
            </button>
          ) : (
            // Show Profile Dropdown if logged in
            <div className="relative group">
              <div className="flex items-center gap-1 cursor-pointer py-2">
                <BiUser className="text-3xl md:text-[38px] group-hover:text-brand-red transition-colors" />
                <div className="w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              {/* Dropdown Menu */}
              <div className="hidden group-hover:block absolute top-full right-0 mt-0 bg-white border border-gray-100 rounded-2xl w-48 shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account</p>
                </div>
                <Link to="/orders" className="block px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-brand-red transition-colors">
                  My Orders
                </Link>
                <hr className="border-gray-50 mx-4" />
                <button 
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;