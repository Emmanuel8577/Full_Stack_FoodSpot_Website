import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const navigate = useNavigate();
  // State to manage the Gift Card modal visibility
  const [showGiftCardModal, setShowGiftCardModal] = useState(false);

  // Smooth scroll handler function for deep layout section links
  const scrollToMenu = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const menuSection = document.getElementById('menu-section');
        if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const menuSection = document.getElementById('menu-section');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <footer className="relative bg-green-900 text-white pt-20 pb-10 overflow-hidden">
        
        {/* --- BACKGROUND ACCENT --- */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* --- TOP SECTION: NEWSLETTER --- */}
          <div className="bg-brand-red rounded-[3rem] p-8 md:p-12 mb-20 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl transform -translate-y-10">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black mb-2 leading-tight">
                Fuel Your Inbox!
              </h2>
              <p className="text-red-100 text-lg font-medium">Subscribe for exclusive offers and fitness-focused meal tips.</p>
            </div>
            
            <div className="flex w-full lg:w-auto bg-white p-2 rounded-2xl shadow-inner">
              <input 
                type="email" 
                placeholder='Enter your email' 
                className="bg-transparent text-gray-900 px-4 py-3 outline-none w-full lg:w-80 font-bold placeholder:text-gray-400"
              />
              <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-black hover:bg-black transition-all active:scale-95">
                Join Now
              </button>
            </div>
          </div>

          {/* --- MIDDLE SECTION: 4 COLUMNS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand & Socials */}
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-4xl font-black tracking-tighter italic">
                FOOD<span className="text-brand-red">SPOT</span>
              </h2>
              <p className="text-gray-400 leading-relaxed font-medium">
                High-performance meals delivered to your doorstep. We bridge the gap between gourmet taste and athletic nutrition.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <SocialIcon Icon={FaFacebook} link="https://web.facebook.com/profile.php?id=61564660986853" />
                <SocialIcon Icon={FaInstagram} link="https://www.instagram.com/emmanuel_edache54/" />
                <SocialIcon Icon={FaTwitter} link="https://x.com/adikwuemmanue10" />
                <SocialIcon Icon={FaTiktok} link="https://vm.tiktok.com/ZS92a3EUaDPgV-HKZKP/" />
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-black mb-6">Explore</h3>
              <ul className="space-y-4 font-bold text-gray-400">
                <li className="text-white font-black tracking-wide select-none">
                  Menu Collection
                </li>
                <li 
                  id="footer-our-services"
                  onClick={scrollToMenu} 
                  className="hover:text-brand-red transition-colors cursor-pointer"
                >
                  Our Services
                </li>
                <li id="footer-track-orders" className="hover:text-brand-red transition-colors cursor-pointer">
                  <span onClick={() => navigate('/orders')} className="block w-full h-full">Track Orders</span>
                </li>
                <li id="footer-about-us" className="hover:text-brand-red transition-colors cursor-pointer">
                  <span onClick={() => navigate('/about')} className="block w-full h-full">About FoodSpot</span>
                </li>
                {/* MODIFIED: Changed Link to an onClick trigger that opens our popup modal */}
                <li 
                  id="footer-gift-cards" 
                  onClick={() => setShowGiftCardModal(true)}
                  className="hover:text-brand-red transition-colors cursor-pointer"
                >
                  Gift Cards
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-black mb-6">Contact Us</h3>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <FaPhoneAlt className="text-brand-red" /> +234 909 1371 18577
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <FaEnvelope className="text-brand-red" /> support@foodspot.com
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <FaMapMarkerAlt className="text-brand-red" /> 123 Fitness Ave, NY
                </li>
              </ul>
            </div>

            {/* Column 4: App Download */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-black mb-6">Get The App</h3>
              <p className="text-gray-400 mb-6 font-medium">Experience the fastest ordering on our mobile app.</p>
              <div className="space-y-3">
                <button className="w-full bg-white text-black py-3 px-6 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-gray-200 transition-all">
                  App Store
                </button>
                <button className="w-full border border-gray-700 py-3 px-6 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                  Google Play
                </button>
              </div>
            </div>

          </div>

          {/* --- BOTTOM SECTION: LEGAL --- */}
          <hr className="border-gray-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-bold text-sm">
            <p>&copy; 2026 FoodSpot. Engineered for Excellence.</p>
            <div className="flex gap-8">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
              <span className="hover:underline cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- POPUP MODAL: GIFT CARDS COMING SOON --- */}
      {showGiftCardModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl text-center relative animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            
            <div className="mx-auto w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-5 text-2xl">
              🎁
            </div>

            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
              Coming Up <span className="text-orange-600">Soon!</span>
            </h3>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
              We are cooking up our custom fitness gift card system. Soon you'll be able to gift premium healthy meal subscriptions to your friends and gym buddies!
            </p>

            <button 
              onClick={() => setShowGiftCardModal(false)}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-lg"
            >
              Awesome, Got It!
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// Sub-component for Social Icons
const SocialIcon = ({ Icon, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-red transition-all duration-300 cursor-pointer text-white shadow-lg"
  >
    <Icon className="text-lg" />
  </a>
)

export default Footer;