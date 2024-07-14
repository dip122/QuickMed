import React from 'react'
import Hero from '../Component/HeroPart/Hero'
import AboutCircles from '../Component/Circles/AboutCircles'
import Services from '../Component/Services/Services'
import ContactUs from '../Component/ContactUs/ContactUs'
import AboutUs from '../Component/AboutUs/AboutUs'
import Navbar from '../Component/Navbar/Navbar'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <AboutUs/>
        <AboutCircles/>
        <Services/>
        <ContactUs/>
    </>
  )
}

export default Home