import React, { useState } from 'react'
import '../Css/Register.css';
import axios from 'axios';
import { loginapi } from '../Apis/Apiroutes';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Component/Navbar/Navbar';


const Login = () => {


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();

    // const Error = (message) =>  toast.error(message);

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
      }

    const MakeValidation = ()=>{
        if(email === ""){
            toast.error("Enter Your Email");
            return true;
        }else if(!validateEmail(email)){
            toast.error("Please Provide a Valid Email address");
            return false;
        }
        if(password === ""){
            toast.error("Please provide passwords");
            return false;
        }
        return true;
    }


    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!MakeValidation())return false;
        try{
            const formData = new FormData();
            formData.append('email',email);
            formData.append('password',password);
            const response = await toast.promise(
                axios.post(loginapi, formData , {
                    withCredentials: true,
                          headers: {
                              "Content-Type": "multipart/form-data",
                          },
                  }),
                {
                  pending: 'Loging in...',
                  success: 'Login Successfully',
                  error: 'Something went wrong'
                }
            );

            if(response && response.data.success){
                console.log('yes');
                const user = response.data.user;
                const token = response.data.token;
                setAuth({
                    ...auth,
                    user : user,
                    token : token
                });

                await localStorage.setItem('Auth-Data',JSON.stringify(response.data));

                setTimeout(()=>{
                    if(response.data.user.role === 1)navigate('/dashboard');
                    else if(response.data.user.role === 0)navigate('/')
                },2000);
            }else{
                toast.error(response.data.message);
                return false;
            }
        }catch(error){
            console.log(error);
            // Error('Api Error Occured');
            return false;
        }
    }



  return (
    <>
        <Navbar/>
        <section className = "register-section register-center">
            <div className = "register-container register">
                <h2 className = "register-heading">Login</h2>
                <form className = "register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        className="apperence-none realtive block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Enter your Email"
                        value = {email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        className="apperence-none realtive block w-full p-4 border border-gray-300 placeholder-gray-500 text-sm rounded-lg focus:outline-none text-gray-900 focus:outline-none focus:z-10"
                        placeholder="Enter your Password"
                        value = {password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div className = "button-class">
                            <button type = "submit" className = "w-3/5 border border-transparent focus:outline-none  rounded-lg bg-purple-500 p-3 text-white font-semibold hover:bg-purple-600">Login</button>
                    </div>
                </form>
                <div className = "font-semibold text-center">Don't Have An Account ? <Link to= "/register" className = "text-blue-600">Register</Link></div>
                <div className = "font-semibold text-center">Forget Password ? <Link to= "/forget-password" className = "text-blue-600">Click Here!</Link></div>
                <ToastContainer pauseOnFocusLoss={false}/>
            </div>
        </section>
    </>
  )
}

export default Login;