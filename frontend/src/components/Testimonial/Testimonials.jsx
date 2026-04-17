import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Sophia Rodriguez",
      location: "Lekki, Lagos",
      image: "https://randomuser.me/api/portraits/women/24.jpg",
      text: "The flavors are authentic and the delivery is always on time. Chuks Kitchen has become my go-to for office lunches!",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Adebayo",
      location: "Victoria Island",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "I've tried many food apps, but the quality here is consistent. The packaging is eco-friendly and the food arrives hot.",
      rating: 5
    },
    {
      id: 3,
      name: "Elena Gilbert",
      location: "Ikeja, Lagos",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Affordable prices for gourmet-level meals. The customer service team is also very responsive if you need to change an order.",
      rating: 4
    }
  ];

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Cards will pop up one after another
      }
    }
  };

  // Animation variants for each individual card
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Header Section with Slide-in Effect --- */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase italic leading-[0.9]">
              Loved by <br /> 
              <span className="text-orange-600">Thousands</span>
            </h2>
            <div className="h-3 w-40 bg-orange-600 mt-8 rounded-full"></div>
          </div>
          <p className="text-gray-500 font-bold text-lg max-w-xs border-l-8 border-gray-100 pl-6 uppercase tracking-tight">
            The community has spoken. <br /> Taste the excellence.
          </p>
        </motion.div>

        {/* --- Animated Testimonials Grid --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {reviews.map((review) => (
            <motion.div 
              key={review.id} 
              variants={cardVariants}
              whileHover={{ scale: 1.02 }} // Subtle grow effect on hover
              className="relative group p-12 rounded-[3.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(255,115,0,0.15)] transition-all duration-500"
            >
              {/* Decorative Quote Mark */}
              <div className="absolute top-8 right-10 text-8xl text-orange-600 opacity-10 font-serif pointer-events-none">
                ”
              </div>

              {/* Star Rating */}
              <div className="flex mb-8 gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? "text-orange-500 text-xl" : "text-gray-200 text-xl"}>
                    ★
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-800 text-xl leading-relaxed mb-10 relative z-10 font-medium italic tracking-tight">
                "{review.text}"
              </p>

              {/* Profile Section */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-16 h-16 rounded-[1.5rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-orange-600 w-6 h-6 rounded-full border-4 border-white"></div>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-tighter text-lg">
                    {review.name}
                  </h4>
                  <p className="text-xs font-black text-orange-600 uppercase tracking-[0.2em]">
                    {review.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Animated Trust Badges --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 flex flex-wrap justify-center gap-x-16 gap-y-8 grayscale hover:grayscale-0 transition-all duration-700"
        >
           <span className="font-black text-3xl uppercase italic tracking-tighter">Fast Delivery</span>
           <span className="font-black text-3xl uppercase italic tracking-tighter">Hygienic Kitchen</span>
           <span className="font-black text-3xl uppercase italic tracking-tighter">Top Rated</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;