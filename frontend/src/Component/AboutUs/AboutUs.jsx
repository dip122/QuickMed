import React from 'react'
import '../../Css/About.css';

const AboutUs = () => {
  return (
    <div className = "about-section">
      <h2 className = "header">About Us</h2>
      <div className = "about-container">
        <div className = "image-class">
          <img src = "images/images3.webp"/>
        </div>
        <div className = "description">
          <div className = "about-desc">
            Welcome to HealthConnect, your trusted platform for seamless healthcare appointments. 
            Book your appointments with top-rated doctors effortlessly and manage all your upcoming 
            consultations in one place. Stay informed with instant notifications when your appointment 
            is confirmed or when a new doctor is approved. Doctors, join our network by applying directly 
            through our site and expand your practice. Our user-friendly interface ensures a smooth experience 
            for both patients and healthcare providers. At HealthConnect, we are committed to connecting you
            with quality healthcare, quickly and conveniently.
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs