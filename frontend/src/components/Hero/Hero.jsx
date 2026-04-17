import React from 'react'
import hero_img from "../../assets/images/pasta2.png"
import { FaShippingFast } from 'react-icons/fa'
import { BiSupport } from 'react-icons/bi'
import { MdPayment } from "react-icons/md"
import { FiSend } from 'react-icons/fi'

const Hero = () => {
  return (
    <div className="relative py-12 lg:py-24 overflow-hidden">
      
      {/* --- BACKGROUND BLOBS (SPREAD AROUND) --- */}
      
      {/* 1. Top Left Blob (Soft & Large) */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] -z-10 opacity-30 animate-pulse">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#BBF7D0" d="M45.7,-77.6C58.3,-69.3,67.1,-55,73.1,-40.4C79.1,-25.7,82.3,-10.8,80.5,3.6C78.8,18.1,72.1,32.1,62.8,44.1C53.5,56,41.7,66,28.1,72.4C14.5,78.8,-0.9,81.7,-16.4,79.5C-31.9,77.3,-47.5,70.1,-59.8,58.8C-72.1,47.5,-81.1,32.2,-83.9,16.2C-86.7,0.2,-83.4,-16.5,-75.4,-30.9C-67.4,-45.3,-54.7,-57.4,-40.7,-64.9C-26.7,-72.4,-11.4,-75.3,2.4,-79.1C16.3,-82.9,33.1,-85.9,45.7,-77.6Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* 2. Middle Right Blob (Thick & Vibrant) */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] -z-10 opacity-40">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#86EFAC" d="M38.1,-65.4C49.1,-58.5,57.7,-47.7,64.2,-35.5C70.6,-23.4,75,-9.8,74.5,3.6C74,17,68.7,30.2,60.5,41.8C52.4,53.4,41.4,63.4,28.6,68.5C15.8,73.6,1.2,73.8,-13.6,71.1C-28.5,68.4,-43.6,62.8,-55.1,52.8C-66.6,42.8,-74.6,28.4,-77.2,13.2C-79.9,-2.1,-77.2,-18.2,-69.8,-31.6C-62.5,-45,-50.5,-55.7,-37.6,-61.8C-24.7,-67.9,-10.9,-69.4,2.3,-73C15.5,-76.6,27.1,-72.3,38.1,-65.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      {/* 3. Bottom Center Blob (Accent Shape) */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] -z-10 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4ADE80" d="M69.8,-23.1C76.3,-2.7,57.6,22.2,35.3,34.8C12.9,47.4,-13,47.7,-34.5,35.3C-56,22.8,-73.1,-2.4,-66.9,-22.4C-60.7,-42.5,-31.2,-57.4,-4.1,-56.1C23,-54.7,63.3,-43.6,69.8,-23.1Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-brand-red font-bold text-xl mb-4 italic tracking-widest uppercase">
              Enjoy Your Delicious Meal
            </h2>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black font-roboto leading-[1.1] mb-8 text-gray-900">
              Discover <span className="text-brand-red">Healthy</span> Meals That Nourish
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Join the FoodSport revolution. Professional nutrition meets world-class taste. Get the fuel you need for your active lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button className="bg-brand-red text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-red-700 transition-all transform hover:scale-110 shadow-2xl active:scale-95">
                Explore Our Menu
              </button>
              <button className="bg-white/50 backdrop-blur-md border-2 border-gray-200 text-gray-800 px-10 py-5 rounded-full font-bold text-xl hover:border-brand-red hover:text-brand-red transition-all shadow-md">
                Our Story
              </button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img 
              src={hero_img} 
              alt='Delicious Pasta' 
              className="w-full max-w-[500px] lg:max-w-[600px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] animate-bounce-slow"
            />
          </div>
        </div>

        {/* --- INFO CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <InfoCard Icon={FaShippingFast} title="Free Shipping" desc="On all orders above $50" />
          <InfoCard Icon={FiSend} title="Fast Delivery" desc="Within 30 minutes" />
          <InfoCard Icon={BiSupport} title="24/7 Support" desc="Talk to our experts" />
          <InfoCard Icon={MdPayment} title="Secure Payment" desc="100% secure checkout" />
        </div>
      </div>
    </div>
  )
}

const InfoCard = ({ Icon, title, desc }) => (
  <div className="flex items-center gap-5 p-8 bg-white/40 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 hover:border-brand-red transition-all duration-500 group">
    <div className="bg-green-100 p-4 rounded-2xl group-hover:bg-brand-red transition-colors duration-500 shadow-inner">
      <Icon className="text-4xl text-brand-red group-hover:text-white transition-colors duration-500" />
    </div>
    <div>
      <h3 className="font-black text-gray-900 text-lg md:text-xl">{title}</h3>
      <p className="text-gray-500 text-sm font-medium">{desc}</p>
    </div>
  </div>
)

export default Hero;