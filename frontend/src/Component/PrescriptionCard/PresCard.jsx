import React, { useState } from 'react'
import '../../Css/PresCard.css'
import PrescriptionModal from '../PrescriptionModal/PrescriptionModal';

const PresCard = ({element, handleDelete}) => {
    //key is the id of prescription 
    const [openmodal,setOpenmodal] = useState(false);
    const toggleopenmodel = ()=>{
        setOpenmodal(!openmodal);
    }


  return (
    <div className="prescard-section">
      <div className="pres-card-descriptions">
        <h3>Doctor Name: {element?.DoctorName}</h3>
        <div className="date">Date: {new Date(element?.Date).toLocaleDateString()}<br />
        Time: {new Date(element?.Date).toLocaleTimeString()}</div>
        <div className="medicines"><span className = "highlight">Medicines : </span>{element?.Medicines}</div>
      </div>
      <div className="prescard-buttons">
        <button onClick = {()=>toggleopenmodel()}>Open Prescription</button>
        <button onClick={()=>handleDelete(element?._id)}>Delete</button>
      </div>
      {openmodal && <PrescriptionModal image={element?.image} setopenmodal = {setOpenmodal}/>}
    </div>
  )
}

export default PresCard