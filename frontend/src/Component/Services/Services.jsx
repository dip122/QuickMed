import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import '../../Css/Services.css'

const Services = () => {
  return (
    <div className = "services">
        <div className = "container">
            <div className = "details">Health Services</div>
            <div className = "banner">
                <div className = "card">
                    <FaUserPlus/>
                    <p className = "firstp">Create Account</p>
                    <p className = "secondp">first create Your Account then Look For Your Doctor.Here you can
                    see various doctors and and you can see their specialization also</p>
                </div>
                <div className = "card">
                    <MdFindInPage />
                    <p className = "firstp">Find Your Doctor</p>
                    <p className = "secondp">Find Your Desired Doctor. what you want and Book Your Appointment to
                        the doctor at your time. Once Admin Approve you will be ready for the service.
                    </p>
                </div>
                <div className = "card">
                    <IoMdSend/>
                    <p className = "firstp">Apply as a Doctor</p>
                    <p className = "secondp">If you are a doctor and you want to become the part of our family you
                        can apply as a doctor . Admin will Aprove you according to their need and your credentials
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services