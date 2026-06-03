import React from "react";
import profilePic from "../../assets/images/admin-photo.png";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4 px-[4%] justify-between bg-white shadow-sm sticky top-0 z-50">
      
      {/* --- Left Side: Brand Logo & Admin Label --- */}
      <div className="flex items-center">
        <div className="shrink-0">
          <h2 className="text-xl md:text-[30px] font-black font-roboto italic tracking-tighter">
            FOOD<span className="text-brand-red text-red-600">SPOT</span>
          </h2>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mt-1 ml-3 italic">
          Admin <span className="text-gray-400">Panel</span>
        </p>
      </div>

      {/* --- Right Side: Profile & Logout --- */}
      <div className="flex items-center gap-4 sm:gap-8">
        
        {/* Admin Profile Details */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-800 leading-none">
              FoodSpot Admin
            </p>
            <p className="text-[10px] text-green-500 font-medium">Active Now</p>
          </div>
          <img
            className="w-10 h-10 rounded-full border-2 border-gray-100 object-cover shadow-sm"
            src={profilePic}
            alt="Admin Profile"
          />
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setToken("")}
          className="bg-gray-900 text-white px-6 sm:px-10 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-tighter hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-gray-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;