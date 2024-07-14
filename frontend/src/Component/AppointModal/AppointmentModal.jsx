import React, { useState } from 'react'
import '../../Css/Modal.css'
import { IoCloseOutline } from "react-icons/io5";
import CloseButton from '../Icon/CloseButton';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { bookappointmentapi } from '../../Apis/Apiroutes';

const AppointmentModal = ({element , setOpenModal}) => {

    const [date,setDate] = useState("");
    const [time,setTime] = useState("");


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('date',date);
            formData.append('time',time);
            formData.append('doctorId',element?.userId?._id);
            formData.append('doctorname',`${element?.userId?.firstname} ${element?.userId?.lastname}`);
            const response = await toast.promise(
                axios.post(bookappointmentapi,formData,{
                    withCredentials : true,
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                }),
                {
                    pending : 'Booking Processing',
                    error : 'Something Went wrong'
                }
            )

            if(response && response.data.success === false){
                toast.error('Already Booked')
            }else if(response && response.data.success === true){
                toast.success('Appointment Booked successfully');
            }
        }catch(error){
            console.log(error);
            return false;
        }
    }
  return (
    <section>
        <div className = "appointment-modal">
            <div className = "content-modal">
                    <div className = "header">Book Appointment</div>
                    <div className = "register-container">
                        <form onSubmit = {handleSubmit}>
                            <label>Date</label>
                            <input 
                            type = "date"
                            placeholder = "Enter a Date"
                            value = {date}
                            onChange = {(e)=>setDate(e.target.value)}
                            />
                            <label>Time</label>
                            <input 
                            type = "time"
                            placeholder = "Enter a time"
                            value = {time}
                            onChange = {(e)=>setTime(e.target.value)}
                            />
                            <button type = "submit">Submit</button>
                            <CloseButton setOpenModal = {setOpenModal}/>
                        </form>
                    </div>
            </div>
            <ToastContainer/>
        </div>
    </section>
  )
}

export default AppointmentModal