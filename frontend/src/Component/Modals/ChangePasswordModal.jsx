import React, { useState } from 'react'
import axios from 'axios';
import { updatepasswordapi } from '../../Apis/Apiroutes';

const ChangePasswordModal = ({isopen,toggleModal}) => {

    const [password,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");
    const [wentwrong,setwentwrong] = useState("");

    const MakeValidation = ()=>{
        if(password!==confirmpassword){
            setwentwrong('fail');
            return false;
        }else if(password === ""){
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
            formData.append('password',password);
            console.log(password);
            const response = await axios.post(updatepasswordapi,formData, {
                withCredentials : true,
                headers : {
                    "Content-Type" : "multipart/form-data",
                }
            });
            if(response && response.data.success){
                console.log('yes')
                setwentwrong('success');
                return true;
            }else{
                setwentwrong('fail');
                console.log('fail')
                return false;
            }
        }catch(error){
            setwentwrong('fail');
            return false;
        }
    }


  return (
    <div className = {`${isopen ? 'flex' : 'hidden'}
     fixed justify-center items-center left-0 right-0 top-0 z-30 overflow-y-auto overflow-x-hidden w-full h-full bg-neutral-900 bg-opacity-70`}>
        <form className = "flex flex-col justify-center items-center p-6 gap-8 bg-orange-300 rounded-lg" onSubmit={handleSubmit}>
            <input
             type = "text"
             placeholder = "Enter the password"
             className ="min-w-60 p-2 border border-gray-400 focus:outline-none"
             value = {password}
             onChange = {(e)=>setpassword(e.target.value)}
             />
             <input 
              type= "text"
              placeholder='ConfirmPassword'
              className = "min-w-60 p-2 border border-gray-400 focus:outline-none"
              value = {confirmpassword}
              onChange={(e)=>setconfirmpassword(e.target.value)}
             />
             <div className = "flex flex-row justify-center items-center gap-4">
                <button type = "submit" className = "rounded-full bg-purple-500 hover:bg-purple-600 px-5 py-2 text-white font-semibold">Update</button>
                <button className = "bg-purple-500 hover:bg-purple-600 px-5 py-2 text-white font-semibold rounded-full hover:bg-purple-600" onClick ={toggleModal}>Close</button>
             </div>
             {wentwrong === 'fail' ? <div className = "text-center">Something went wrong</div> : wentwrong === 'success' && <div className = "text-center">Password Updated</div>}
        </form>
    </div>
  )
}

export default ChangePasswordModal