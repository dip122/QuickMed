import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { resetpasswordapi } from '../Apis/Apiroutes';

const ResetPassword = () => {
    const [password ,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");
    const [status,setstatus] = useState("");
    const {token} = useParams();//token we will get form params


    const MakeValidation = ()=>{
        if(password === "" || confirmpassword === ""){
            return false;
        }else if(password !== confirmpassword){
            return false;
        }
        return true;
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!MakeValidation())return true;
        try{
            const url = resetpasswordapi + token;
            const formData = new FormData();
            formData.append('password',password);
            const response = await axios.post(url, formData , {
                withCredentials : true,
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            if(response && response.data.success){
                setstatus("success");
                return true;
            }else{
                setstatus('fail');
                return false;
            }
        }catch(error){
            console.log(error);
            setstatus('fail');
            return false;
        }
    }

  return (
    <div className= "flex flex-col min-h-dvh justify-center items-center min-h-screen bg-neutral-200 p-8 w-full space-y-8">
        <div className = "text-3xl font-extrabold text-gray-800">ForgetPassword</div>
            <form className = "mt-8 space-y-6 w-80" onSubmit={handleSubmit}>
                <div className = "rounded-md space-y-3">
                    <input
                    type = "password"
                    placeholder = "Enter Your Password"
                    className = "apperence-none realtive block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value ={password}
                    onChange={(e)=>setpassword(e.target.value)}
                    />
                    <input
                    type = "password"
                    placeholder = "Confirm Your Password"
                    className = "apperence-none realtive block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value ={confirmpassword}
                    onChange={(e)=>setconfirmpassword(e.target.value)}
                    />
                </div>
                <div className = "flex justify-center items-center">
                    <button type = "submit" className = "w-3/5 rounded-lg py-3 px-4 text-white font-semibold border border-transparent bg-gradient-to-r from-indigo-600 to-blue-500 focus:outline-none transition-all duration-300">Continue</button>
                </div>
                {status === 'success' ? <div className = "text-center font-semibold">Password Updated</div> : (status === 'fail' ? <div className = "text-center font-semibold">Failed</div> : (status === 'wait' ? <div className = "text-center font-semibold">Wait...</div> : <div className = "text-center font-semibold">Provide Details</div>))}
            </form>
    </div>
  )
}

export default ResetPassword