import React, { useContext, useState } from "react";
import { FoodContext } from "../../context/FoodContext";
import ServerLoader from '../../components/ServerLoader';
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const FoodCollection = () => {
  const [category, setCategory] = useState("All");
  // CONNECTED: Using removeFromCart to completely unselect/toggle items
  const { products, addToCart, removeFromCart, currency, url, cartItems } = useContext(FoodContext);
  const navigate = useNavigate();

  // Categories aligned with your Admin Dashboard
  const categories = ["All", "Rice", "Drinks", "Swallow", "Noodles", "Protein"];

  // Calculate total item quantity inside the cart object state
  const totalCartCount = Object.values(cartItems).reduce((total, qty) => total + (qty || 0), 0);

  // Toggle selection handler to keep things clean and non-redundant
  const handleItemToggle = (productId) => {
    const isSelected = cartItems[productId] > 0;
    if (isSelected) {
      // If already in cart, remove it completely to unselect
      removeFromCart(productId);
    } else {
      // If not in cart, add it to select (sets quantity to 1)
      addToCart(productId);
    }
  };

  return (
    <div id="menu-section" className="py-16 bg-white max-w-7xl mx-auto px-4 scroll-mt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Discover Our <span className="text-orange-600">Menu</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Category Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 sticky top-24">
            <h2 className="text-xl font-black mb-6">Categories</h2>
            <ul className="space-y-2">
              {categories.map((item) => (
                <li
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`cursor-pointer px-5 py-3 rounded-2xl font-bold transition-all ${
                    category === item ? "bg-orange-600 text-white shadow-lg" : "text-gray-500 hover:bg-white"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:w-3/4">
          {products.length === 0 ? (
            <div className="min-h-[400px] flex items-center justify-center w-full">
              <ServerLoader />
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-fadeIn">
                {products
                  .filter((p) => category === "All" || p.category === category)
                  .map((product) => {
                    const isSelected = cartItems[product._id] > 0;

                    return (
                      <div key={product._id} className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                        <div>
                          <div className="relative overflow-hidden rounded-[1.5rem] bg-gray-100 aspect-square mb-4">
                            <img src={`${url}/images/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                            
                            {/* Selection Checkmark Indicator */}
                            {isSelected && (
                              <div className="absolute top-4 left-4 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg animate-in zoom-in duration-200">
                                ✓
                              </div>
                            )}

                            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-xl font-black text-orange-600 shadow-md">
                              {currency}{product.price}
                            </div>
                          </div>

                          <h3 className="text-lg font-black mb-1">{product.name}</h3>
                          
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        {/* --- ACTIONS SECTION WITH SIMPLIFIED TOGGLE STYLE --- */}
                        <div className="mt-auto pt-2">
                          <button
                            onClick={() => handleItemToggle(product._id)}
                            className={`w-full py-3 rounded-xl font-bold cursor-pointer transition-all uppercase tracking-wider ${
                              isSelected 
                                ? "bg-orange-600 text-white shadow-md hover:bg-red-600" 
                                : "bg-gray-900 text-white hover:bg-orange-600"
                            }`}
                          >
                            {isSelected ? "ADDED (REMOVE)" : "ADD TO CART"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* --- COMPACT CENTERED ACTION BUTTON --- */}
              {totalCartCount > 0 && (
                <div className="w-full flex justify-center pt-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <button
                    onClick={() => navigate('/cart')}
                    className="bg-orange-600 text-white py-3.5 px-6 rounded-2xl font-black text-base flex items-center gap-4 shadow-lg hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FaShoppingBag className="text-white text-lg group-hover:animate-pulse" />
                      <span className="tracking-wider uppercase text-sm">View Your Cart</span>
                    </div>
                    
                    <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-black tracking-wide shadow-inner flex items-center gap-1.5">
                      <span>{totalCartCount}</span>
                      <span className="text-orange-500">&rarr;</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCollection;