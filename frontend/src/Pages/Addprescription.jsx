import React, { useState } from 'react'
// import { ToastContainer } from 'react-toastify'
import '../Css/pres.css';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/Context'
import { useEffect } from 'react'
import axios from 'axios'
import { postprescriptionapi } from '../Apis/Apiroutes';
import Navbar from '../Component/Navbar/Navbar';

const Addprescription = () => {

    const [auth,setAuth] = useAuth();
    const [name,setName] = useState("");
    const [Medicines,setMedicines] = useState("");
    const [Date,setDate] = useState("");
    const [image,setImage] = useState(null);

    const MakeValidation = ()=>{
        if(!name){
            toast.error("Please Enter Name of Doctor");
            return false;
        }
        if(Medicines === ""){
            toast.error("Please write down medicines");
            return false;
        }
        if(!Date){
            toast.error("Please enter the date");
            return false;
        }
        if(!image){
            toast.error("Please Add Files");
            return false;
        }
        return true;
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!MakeValidation())return false;
        try{
            const formData = new FormData();
            formData.append('userid',auth?.user?._id);
            formData.append('name',name);
            formData.append('Medicines',Medicines)
            formData.append('Date',Date);
            formData.append('image',image);
            const response = await toast.promise(
                axios.post(postprescriptionapi,formData,{
                    withCredentials  : true,
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                }),{
                    pending  : "Application Processing",
                    error : "Something went wrong"
                }
            );
            if(response && response.data.success){
                toast.success("Successfully Uploaded the Prescription");
                console.log(response.data.prescription);
                return true;
            }else{
                toast.error(response.data.message);
                return false;
            }
        }catch(error){
            console.log(error);
            toast.error("Server side error has occured");
            return false;
        }
    }
  return (
    <>
        <Navbar/>
        <section className = "pres-section pres-center">
            <div className = "pres-container pres">
                <h2 className = "pres-heading">Add Prescription</h2>
                <form className = "pres-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                    placeholder="Enter Doctor Name"
                    value = {name}
                    onChange = {(e)=>setName(e.target.value)}
                />
                <input
                    type="Date"
                    name="Date"
                    className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                    placeholder="Enter Date"
                    value = {Date}
                    onChange = {(e)=>setDate(e.target.value)}
                />
                <input
                    type="text"
                    name="medicines"
                    className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                    placeholder="Enter Medicines"
                    value = {Medicines}
                    onChange = {(e)=>setMedicines(e.target.value)}
                />
                <input
                    type = "file"
                    placeholder = "Enter Prescriptions"
                    className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                    name = "prescription"
                    onChange = {(e)=>setImage(e.target.files[0])}
                />
                <div className = "button-class">
                        <button type = "submit" className='w-3/4 bg-purple-500 px-5 py-2 text-white font-semibold hover:bg-purple-600'>Addprescription</button>
                </div>
                </form>
                <ToastContainer pauseOnFocusLoss={false}/>
            </div>
        </section>
    </>
  )
}

export default Addprescription