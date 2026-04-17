import React from 'react'
import delivery_img from "../../assets/images/Home_delivery2.png" 
import { FaMapMarkedAlt, FaClock } from 'react-icons/fa'

const HomeDelivery = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 lg:py-32 overflow-hidden bg-white">
      
      {/* --- BACKGROUND SVGS (IMPROVED VISIBILITY) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-[600px] h-[600px] opacity-40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#BBF7D0" d="M44.7,-76.4C58.2,-69.2,70.1,-58.3,78.2,-44.8C86.3,-31.3,90.7,-15.7,89.1,-0.9C87.5,13.8,80,27.7,71.1,40.1C62.2,52.5,51.9,63.4,39.5,71.1C27.1,78.8,12.5,83.3,-1.9,86.6C-16.3,89.8,-30.5,91.8,-43.3,86.1C-56.1,80.4,-67.5,67,-75.2,52.2C-82.9,37.3,-86.9,21.1,-88.2,4.6C-89.5,-11.9,-88.1,-28.7,-80.6,-42.8C-73.1,-56.9,-59.5,-68.4,-44.9,-75C-30.3,-81.6,-14.7,-83.4,0.5,-84.3C15.7,-85.2,31.2,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>

        <svg className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#86EFAC" d="M37.5,-62.7C48.3,-54.2,56.5,-42.3,62.7,-29.4C68.9,-16.5,73.1,-2.6,71.2,10.2C69.3,23.1,61.4,35,51.1,44.9C40.8,54.8,28.1,62.8,14.2,66.6C0.3,70.4,-14.8,70,-28.9,65.3C-43,60.6,-56.1,51.6,-64.5,39.3C-72.9,27,-76.6,11.4,-75.4,-3.6C-74.2,-18.6,-68.1,-33.1,-58.1,-43.3C-48.1,-53.5,-34.2,-59.5,-21,-65.4C-7.8,-71.3,4.7,-77.1,18.8,-76.3C32.9,-75.5,48.5,-68.2,37.5,-62.7Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-[1900px] mx-auto px-6 lg:px-16 relative z-10 w-full">
        {/* Changed layout to 40% Text, 60% Image (grid-cols-12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-16 lg:gap-10">
          
          {/* --- LEFT SIDE: THE SPREAD TEXT (Smaller Scale) --- */}
          {/*lg:col-span-4 narrows the text container */}
          <div className="lg:col-span-4 flex flex-col space-y-16 lg:space-y-24 text-center lg:text-left">
            
            {/* 1. Header Block (Reduced Sizes) */}
            <div>
              <p className="text-brand-red font-black text-base md:text-lg uppercase tracking-[0.5em] mb-4">Fast Delivery</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-roboto leading-snug text-gray-900 tracking-tight">
                Fresh <span className="text-brand-red">Meals</span> <br /> 
                To Your Door <br />
                Faster
              </h1>
            </div>
            
            {/* 2. Middle Block (Reduced Description) */}
            <div className="max-w-md mx-auto lg:mx-0">
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed font-medium">
                Our professional network ensures that your healthy meals arrive fresh and hot, exactly when you need them.
              </p>
            </div>

            {/* 3. Bottom Block (Reduced Icons/Button) */}
            <div className="space-y-10">
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                <div className="flex items-center gap-3">
                  <FaClock className="text-3xl text-brand-red" />
                  <span className="text-lg font-bold text-gray-800">30 Min Limit</span>
                </div>
                <div className="h-1 w-10 bg-gray-300 lg:hidden block"></div>
                <div className="flex items-center gap-3">
                  <FaMapMarkedAlt className="text-3xl text-brand-red" />
                  <span className="text-lg font-bold text-gray-800">Live Tracker</span>
                </div>
              </div>

              <button className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-brand-red transition-all shadow-xl hover:scale-105 active:scale-95 mx-auto lg:mx-0">
                Track Your Order
              </button>
            </div>
          </div>

          {/* --- RIGHT SIDE: THE GIGANTIC IMAGE (60% Width) --- */}
          {/* lg:col-span-8 gives the image much more territory */}
          <div className="lg:col-span-8 flex justify-center lg:justify-end">
            <img 
              src={delivery_img} 
              alt='Delivery Rider' 
              // Set maximum scale significantly larger
              className="w-full h-auto max-w-[700px] lg:max-w-[1100px] xl:max-w-[1300px] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.15)]"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default HomeDelivery;