import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../Context/Context';
import { getalldoctorsapi } from '../Apis/Apiroutes';
import DoctorCard from '../Component/DoctorCard/DoctorCard';
import '../Css/DoctorsList.css';
import Loading from '../Component/Loading/Loading';
import Navbar from '../Component/Navbar/Navbar';


const DoctorsList = () => {

    const [auth,setAuth] = useAuth();
    const [doctors,setDoctors] = useState([]);


    useEffect(()=>{
        const GetDoctors = async()=>{
            try{
                const response = await axios.get(getalldoctorsapi);
                console.log(response);
                if(response && response.data.success){
                    setDoctors(response.data.Doctors);
                    console.log(response.data.Doctors);
                }else{
                    setDoctors([]);
                }
            }catch(error){
                console.log(error);
                setDoctors([]);
            }
        }

        if(auth && auth?.user){
            console.log('yes');
            GetDoctors()
        }
    },[auth && auth?.user])

  return (
    <>
        <Navbar/>  
        <section className = "doctor-list">
            {(doctors && doctors.length === 0) ?  (
                <>
                    <Loading/>
                </>
            ) : (
                <div className = "list-items">
                    <div className = "header">All Doctors</div>
                    <div className = "doctors">
                        {doctors && doctors.length > 0 && doctors.map((doc,index)=>{
                            return (
                                <div className = "single-doctor" key = {index}>
                                    <DoctorCard
                                    element = {doc}
                                    key = {doc._id}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </section>
    </>
  )
}

export default DoctorsList