import React from 'react'
import '../Css/ErrorPage.css'

const ErrorPage = () => {
  return (
    <div className = "Error-page">
        <div className = "image-class">
            <img src = "/images/error_image.jfif" alt = "error"/>
        </div>
        <div className = "back-to-home">
            <button>Home</button>
        </div>
    </div>
  )
}

export default ErrorPage