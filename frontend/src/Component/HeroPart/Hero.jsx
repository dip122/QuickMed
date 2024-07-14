import React from 'react'
import '../../Css/HeroPart.css';

const Hero = () => {
  return (
    <section className = "hero-part">
        <div className = "hero-content">
            <h1>WelCome Here! Your Precious Health</h1>
            <p>Welcome to YourHealthHub, your ultimate destination for comprehensive wellness 
                guidance. Here, we empower you with expert advice, personalized health plans, 
                and the latest medical insights to help you thrive. Discover a wealth of resources 
                on fitness, nutrition, mental health, and more, tailored to meet your unique needs. 
                Our community of healthcare professionals is dedicated to supporting your journey to optimal health. 
                Join us today and take the first step towards a healthier, happier you. </p>
        </div>
        <div className = "hero-image">
            <img src= "/images/images1.webp" alt = "images"/>
        </div>
    </section>
  )
}

export default Hero