import React, { useState } from 'react'
import '../Css/Register.css';
import axios from 'axios';
import { registerapi } from '../Apis/Apiroutes';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Component/Navbar/Navbar';


const Register = () => {
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword , setconfirmpassword] = useState("");
    const [contact,setContact] = useState("");
    const [address,setAddress] = useState("");
    const [profile_pic,setProfilePic] = useState(null);
    const toastId = React.useRef(null);

    const Notify = (message) => toast.success(message)
    const Error = (message) =>  toast.error(toastId.current);

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
      }

    const MakeValidation = ()=>{
        if(firstname === "" || lastname === ""){
            toast.error("Enter Your Name");
            return false;
        }else if(firstname.length<3 || lastname.length < 3){
            toast.error("Length should be 3 letters or more");
            return false;
        }
        if(email === ""){
            toast.error("Enter Your Email");
            return true;
        }else if(!validateEmail(email)){
            toast.error("Please Provide a Valid Email address");
            return false;
        }
        if(password === "" || confirmpassword === ""){
            toast.error("Please provide passwords");
            return false;
        }else if(password !== confirmpassword){
            toast.error("Confirmpassword do not match");
            return false;
        }
        if(contact === ""){
            toast.error("Enter Your Contact");
            return false;
        }else if(contact.length !== 10){
            toast.error("Contact should be of 10 letters");
            return false;
        }
        if(address === ""){
            toast.error("Enter Your address");
            return false;
        }
        if(profile_pic === null){
            toast.error("Enter Profile Picture");
            return false;
        }
        return true;
    }


    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!MakeValidation())return false;
        try{
            const formData = new FormData();
            formData.append('firstname',firstname);
            formData.append('lastname',lastname);
            formData.append('email',email);
            formData.append('password',password);
            formData.append('contact',contact);
            formData.append('address',address);
            formData.append('profile_pic',profile_pic);
            const response = await toast.promise(
                axios.post(registerapi, formData , {
                    withCredentials: true,
                          headers: {
                              "Content-Type": "multipart/form-data",
                          },
                  }),
                {
                  pending: 'Registering User...',
                  error: 'Something went wrong'
                }
            );
            if(response && response.data.success){
                toast.success(response.data.message);
            }else{
                toast.success(response.data.message);
            }
        }catch(error){
            console.log(error);
            Error('Api Error Occured');
            return false;
        }
    }



  return (
    <>
    <Navbar/>
    <section className = "register-section register-center">
        <div className = "register-container register">
            <h2 className = "register-heading">Register</h2>
            <form className = "register-form" onSubmit={handleSubmit}>
               <input
                type="text"
                className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Enter your FirstName"
                value = {firstname}
                onChange={(e)=>setFirstname(e.target.value)}
               />
               <input
                type="text"
                className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Enter your LastName"
                value = {lastname}
                onChange={(e)=>setLastname(e.target.value)}
               />
               <input
                type="text"
                className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Enter your Email"
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
               />
               <input
                type="password"
                className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Enter your Password"
                value = {password}
                onChange={(e)=>setPassword(e.target.value)}
               />
               <input
                type="password"
                className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Re-enter Your Password"
                value = {confirmpassword}
                onChange={(e)=>setconfirmpassword(e.target.value)}
               />
               <input
                type="text"
                className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Enter your contact"
                value = {contact}
                onChange={(e)=>setContact(e.target.value)}
               />
               <input
                type="text"
                className="apperence-none realtive block w-full p-4 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Enter your address"
                value = {address}
                onChange={(e)=>setAddress(e.target.value)}
               />
               <input
                type = "file"
                placeholder = "Enter Profile Pic"
                className = "apperence-none realtive block w-full p-4 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                name = "profile_pic"
                onChange={(e)=>setProfilePic(e.target.files[0])}
               />
               <div className = "button-class">
                    <button type = "submit" className='w-3/4 bg-purple-500 px-5 py-2 text-white font-semibold hover:bg-purple-600'>Register</button>
               </div>
            </form>
            <ToastContainer pauseOnFocusLoss={false}/>
        </div>
    </section>
    </>
  )
}

export default Register