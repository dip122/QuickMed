import React, { useState } from 'react'
import '../../Css/Contact.css'
import axios from 'axios';
import { contactusapi } from '../../Apis/Apiroutes';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [description,setDescription] = useState("");

    const MakeValidation = ()=>{
        if(name === "" || email === "" || description === ""){
            toast.error("Please enter all the fields");
            return false;
        }
        return true;
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!MakeValidation())return false;
        try{
            const formData = new FormData();
            formData.append('name',name);
            formData.append('email',email);
            formData.append('description',description);
            
            const response = await axios.post(contactusapi, formData , {
                withCredentials: true,
                      headers: {
                          "Content-Type": "multipart/form-data",
                      },
              });
              console.log(response);
            if(response && response.data.success){
                toast.success(response.data.message);
            }else{
                toast.error('Contact is not successful');
            }
        }catch(error){
            console.log(error);
            toast.error("Api Error has occured");
            return false;
        }

    }

    
  return (
    <section className = "contact-section contact-center" id = "contact">
        <div className = "contact-container contact">
            <h2 className = "font-semibold">Contact-US</h2>
            <form className = "contact-form" onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Enter Your name"
                value = {name}
                onChange={(e)=>setName(e.target.value)}
               />
               <input
                type="text"
                name="email"
                className="apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Enter Your Email"
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
               />
               <textarea 
                type = "text"
                name = "description"
                className = "apperence-none realtive block w-full p-3 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                placeholder="Enter Your Description"
                rows = "8"
                cols = "12"
                value = {description}
                onChange={(e)=>setDescription(e.target.value)}
                />
               <div className = "button-class">
                    <button type = "submit" className='w-3/4 bg-purple-500 px-5 py-2 text-white font-semibold hover:bg-purple-600 rounded-lg'>Submit</button>
               </div>
            </form>
            <ToastContainer/>
        </div>
    </section>
  )
}

export default ContactUs