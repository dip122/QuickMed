import React, { useState } from 'react'
import '../../Css/DoctorCard.css'
import {useAuth} from '../../Context/Context'
import AppointmentModal from '../AppointModal/AppointmentModal';

const DoctorCard = ({element}) => {

    const [openmodal,setOpenModal] = useState(false);



    const [auth,setAuth] = useAuth();

    const handleClick = () =>{
        if(!auth || auth?.user){

        }
        setOpenModal(true);
        // console.log('clicked')
    }
    
  return (
    <div className = "card-section">
        <div className = "image-section">
            <img src={element?.userId?.profile_pic?.url ? element?.userId?.profile_pic?.url : `/Images/profile_pic.jpg`}/>
        </div>
        <div className = "card-description">
            <h3 className = "card-name">{element?.userId?.firstname + " " + element?.userId?.lastname}</h3>
            <p className = "specialization">
                Specialization : {element?.specialization}
            </p>
            <p className = "experience">Experience
                : {element?.experience}
            </p>
            <p className = "contact">
                Contact : {element?.userId?.contact}
            </p>
            <p className = 'fess'>
                Fees : {element?.fees}
            </p>
        </div>
        <div className = "btn-class">
            <button onClick = {handleClick}>Book Appointment</button>
        </div>
        {openmodal && <AppointmentModal element={element} setOpenModal={setOpenModal}/>}
    </div>
  )
}

export default DoctorCard