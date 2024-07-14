import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { deleteprescriptionsapi, getprescriptionsapi } from '../Apis/Apiroutes';
import { useAuth } from '../Context/Context';
import Loading from '../Component/Loading/Loading';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PresCard from '../Component/PrescriptionCard/PresCard';
import '../Css/PresList.css'
import Navbar from '../Component/Navbar/Navbar';
import EmptyPage from '../Component/Empty/EmptyPage';

const Prescriptions = () => {

    const [pres,setPres] = useState([]);
    const [auth,setAuth] = useAuth(); 
    useEffect(()=>{
        const GetPrescriptions = async()=>{
            try{
                const response = await axios.get(getprescriptionsapi);
                if(response && response.data.success){
                    setPres(response.data.prescriptions);
                }else{
                    setPres([]);
                }
            }catch(error){
                console.log(error);
                setPres([]);
            }
        }
        if(auth && auth?.user)GetPrescriptions();
    },[auth && auth?.user]);

    const DeletePrescriptions = async(id)=>{
        try{
            console.log(id);
            const url = deleteprescriptionsapi + id;
            const response = await toast.promise(
                axios.delete(url),{
                    pending : "Processing",
                    error : "Something went wrong"
                }
            );
            if(response && response.data.success){
                toast.success("Prescriptions Deleted Successfully");
                const updatedpres = pres.filter((pres)=>pres._id !== id);
                setPres(updatedpres);
            }
            
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
    <Navbar/>
    <section className = "pres-list">
        {(pres && pres.length === 0) ? (<EmptyPage/>) : (
            <div className = "list-items">
                <div className = "pres-header">Prescriptions</div>
                <div className = "prescriptions">
                    {pres && pres.length>0 && pres.map((ele,index)=>{
                        return (
                            <div className = "single-prescriptions" key ={index}>
                                <PresCard element = {ele} handleDelete ={DeletePrescriptions}/>
                            </div>
                        )
                    })}
                </div>
                <ToastContainer/>
            </div>
        )}

    </section>
    </>
  )
}

export default Prescriptions