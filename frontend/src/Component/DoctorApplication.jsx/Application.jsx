import React, { useState } from 'react'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { doctorapplication } from '../../Apis/Apiroutes';
import '../../Css/Application.css'
import { useAuth } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const Application = () => {

    const [specialization,setspecialization] = useState("");
    const [experience,setExperience] = useState("");
    const [fees,setFees] = useState("");
    const [registration,setRegistration] = useState("");
    const [certificate,setcertificate] = useState(null);
    const navigate = useNavigate();

    const [auth,setAuth] = useAuth();

    const MakeValidation = ()=>{
        if(specialization === ""){
            toast.error('Please provide Specialization');
            return false;
        }
        if(experience === ""){
            toast.error("Please provide Experience");
            return false;
        }
        if(fees === ""){
            toast.error('Please provide Fees');
            return false;
        }
        if(registration === ""){
            toast.error('Please provide Registration');
            return false;
        }
        if(certificate === null){
            toast.error('Please provide Certificate');
            return false;
        }
        return true;
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!MakeValidation())return false;
        if(!(auth && auth?.user?.role === 0)){
            toast.error('please login first');
            return false;
        }
        try{
            const formData = new FormData();
            formData.append('specialization',specialization);
            formData.append('experience',experience);
            formData.append('fees',fees);
            formData.append('registration',registration);
            formData.append('certificate',certificate);

            const response = await toast.promise(
                axios.post(doctorapplication,formData,{
                    withCredentials : true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }),
                {
                    pending : 'Application Processing',
                    success : "Applciation Submitted successfully",
                    error : "SomeThing went Wrong"
                }
            )

            if(response && response.data.success){
                setTimeout(()=>{
                    navigate('/')
                },1000)
                return true;
            }

            return true;
            
        }catch(error){
            console.log(error);
            return false;
        }
    }


  return (
    <>
        <Navbar/>
        <div className = "application-section">
            <div className = "application-container">
                <h2 className = "h2-class">Apply For Doctor</h2>
                <form className = "application-form" onSubmit={handleSubmit}>
                    <input
                    type = "text"
                    name = "specialization"
                    placeholder='Enter Your Specialization'
                    className = "apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                    value = {specialization}
                    onChange= {(e)=>setspecialization(e.target.value)}
                    />
                    <input
                    type = "text"
                    name = "experience"
                    placeholder='Enter Your Experience in yrs'
                    className = "apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                    value = {experience}
                    onChange={(e)=>setExperience(e.target.value)}
                    />
                    <input
                    type = "text"
                    name = "fees"
                    placeholder='Enter Your Fees'
                    className = "apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                    value ={fees}
                    onChange = {(e)=>setFees(e.target.value)}
                    />
                    <input
                    type = "text"
                    name = "registration"
                    placeholder='Enter Your Registration No'
                    className = "apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                    value = {registration}
                    onChange={(e)=>setRegistration(e.target.value)}
                    />
                    <input
                    type = "file"
                    name = "certificate"
                    placeholder = "Enter Your Certificate"
                    className = "apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                    onChange={(e)=>setcertificate(e.target.files[0])}
                    />
                    <div className = "button-class">
                        <button type = "submit" className = "w-3/5 rounded-lg border border-transparent focus:outline-none bg-purple-500 p-2.5 text-white font-semibold hover:bg-purple-600">Submit</button>
                    </div>
                </form>
            </div>
            <ToastContainer pauseOnFocusLoss={false}/>
        </div>
    </>
  )
}

export default Application