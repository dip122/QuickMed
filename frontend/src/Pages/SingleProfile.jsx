import React from 'react'
import { useAuth } from '../Context/Context'

const SingleProfile = () => {

    const [auth,setAuth] = useAuth();
  return (
    <div className = "single-profile min-h-screen flex justify-center items-center p-8">
        <div className = "main-container flex flex-row gap-10 ">
            <img src = {auth?.user?.profile_pic?.url} alt="profile pic" className = "h-40 w-40 rounded-full object-cover border-2 border-gray-200"/>
            <div className = "details flex flex-col gap-y-4">
                <div className = "text-base font-semibold">Name : <span>{auth?.user?.firstname} {auth?.user?.lastname}</span></div>
                <div className = "text-base font-semibold">Email : <span>{auth?.user?.email}</span></div>
                <div className = "text-base font-semibold">Contact : <span>{auth?.user?.contact}</span></div>
                <div className = "text-base font-semibold">Address : <span>{auth?.user?.address}</span></div>
                <div className = "text-base font-semibold">{auth?.user?.isDoctor === false ? 'Not A Doctor' : 'I am registered as a doctor'}</div>
            </div>
        </div>
    </div>
  )
}

export default SingleProfile