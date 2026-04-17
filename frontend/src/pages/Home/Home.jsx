import React from 'react'
import Hero from '../../components/Hero/Hero'
import FoodCollection from '../../components/FoodCollection/FoodCollection'
import HomeDelivery from '../../components/HomeDelivery/HomeDelivery'
import Testimonials from '../../components/Testimonial/Testimonials'

const Home = () => {
  return (
    <div>
      <Hero/>
      <FoodCollection/>
      <HomeDelivery/>
      <Testimonials/>
    </div>
  )
}

export default Home
