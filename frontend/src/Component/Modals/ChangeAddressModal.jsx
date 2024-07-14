import React, { useState } from 'react'
import axios from 'axios';
import { updatecontactapi } from '../../Apis/Apiroutes';
import { useAuth } from '../../Context/Context';

const ChangeAddressModal = ({isopen,toggleModal}) => {

  const [address,setAddress] = useState("");
  const [contact,setContact] = useState("");
  const [wentwrong,setwentwrong] = useState("");
  const [auth,setAuth] = useAuth();
  
  const MakeValidation = ()=>{
    if(address === "" || contact === ""){
      setwentwrong('fail');
      return false;
    }else if(contact.length !== 10){
      setwentwrong('fail');
      return false;
    }

    setwentwrong('success');
    return true;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!MakeValidation())return false;
    try{
      const formData = new FormData();
      formData.append('contact',contact);
      formData.append('address', address);
      const response = await axios.post(updatecontactapi , formData , {
        withCredentials : true,
        headers : {
          "Content-Type" : "multipart/form-data"
        }
      });
      if(response && response.data.success){
        // console.log(response.data)
        setAuth({
          ...auth,
          user : response.data.user,
        })
        const data = await JSON.parse(localStorage.getItem('Auth-Data'));
        data.user.contact  = contact
        data.user.address = address
        await localStorage.removeItem('Auth-Data')
        await localStorage.setItem('Auth-Data',JSON.stringify(data));
        setwentwrong('success');
      }else{
        setwentwrong('fail');
      }
    }catch(error){
      console.log(error);
      setwentwrong('fail');
      return false;
    }
  }

  return (
    <div className = {`${isopen ? 'flex' : 'hidden'}
      justify-center items-center left-0 right-0 top-0 z-30 fixed overflow-y-auto overflow-x-hidden w-full h-full bg-neutral-800 bg-opacity-70`}>
          <form className = "flex flex-col justify-center items-center p-6 gap-8 bg-orange-300 rounded-lg" onSubmit={handleSubmit}>
            <input
             type = "text"
             placeholder = "Enter the Address"
             className ="min-w-60 p-2 border border-gray-400 focus:outline-none"
             value = {address}
             onChange = {(e)=>setAddress(e.target.value)}
             />
             <input 
              type= "text"
              placeholder='Enter New Contact'
              className = "min-w-60 p-2 border border-gray-400 focus:outline-none"
              value = {contact}
              onChange={(e)=>setContact(e.target.value)}
             />
             <div className = "flex flex-row justify-center items-center gap-4">
                <button type = "submit" className = "rounded-full bg-purple-500 hover:bg-purple-600 px-5 py-2 text-white font-semibold">Update</button>
                <button className = "bg-purple-500 hover:bg-purple-600 px-5 py-2 text-white font-semibold rounded-full hover:bg-purple-600" onClick ={toggleModal}>Close</button>
             </div>
             {wentwrong === 'fail' ? <div className = "text-center">Something went wrong</div> : wentwrong === 'success' && <div className = "text-center">Update successful</div>}
        </form>
      
    </div>
  )
}

export default ChangeAddressModal