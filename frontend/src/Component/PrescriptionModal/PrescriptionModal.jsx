import React from 'react'
import CloseButton from '../Icon/CloseButton'

const PrescriptionModal = ({image,setopenmodal}) => {
  return (
    <section>
        <div className = "appointment-modal">
            <div className = "content-modal">
                    <img src = {image?.url} alt = "prescriptions-image" style={{height : "230px", width : "280px"}}/>
                    <CloseButton setOpenModal = {setopenmodal} />
            </div>
        </div>
    </section>
  )
}

export default PrescriptionModal