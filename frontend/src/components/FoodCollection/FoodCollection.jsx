import React, { useContext, useState } from "react";
import { FoodContext } from "../../context/FoodContext";
import ServerLoader from '../../components/ServerLoader';

const FoodCollection = () => {
  const [category, setCategory] = useState("All");
  const { products, addToCart, currency, url, cartItems } = useContext(FoodContext);

  // Categories aligned with your Admin Dashboard
  const categories = ["All", "Rice", "Drinks", "Swallow", "Noodles", "Protein"];

  return (
    <div className="py-16 bg-white max-w-7xl mx-auto px-4">
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
          {/* FIXED: Place the spinner check here. If zero products are loaded, show spinner inside the grid area */}
          {products.length === 0 ? (
            <div className="min-h-[400px] flex items-center justify-center w-full">
              <ServerLoader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-fadeIn">
              {products
                .filter((p) => category === "All" || p.category === category)
                .map((product) => (
                  <div key={product._id} className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-gray-100 aspect-square mb-4">
                      <img src={`${url}/images/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                      
                      {/* Selection Indicator */}
                      {cartItems[product._id] > 0 && (
                        <div className="absolute top-4 left-4 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg animate-bounce">
                          {cartItems[product._id]}
                        </div>
                      )}

                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-xl font-black text-orange-600 shadow-md">
                        {currency}{product.price}
                      </div>
                    </div>

                    <h3 className="text-lg font-black mb-1">{product.name}</h3>
                    
                    {/* Product Description */}
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <button
                      onClick={() => addToCart(product._id)}
                      className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-orange-600 transition-all"
                    >
                      ADD TO CART
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCollection;