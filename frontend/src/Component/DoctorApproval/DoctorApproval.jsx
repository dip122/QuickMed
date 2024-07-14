import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Context';
import axios from 'axios';
import { acceptdoctorapi, getapplieddoctorsapi, rejectdoctorapi } from '../../Apis/Apiroutes';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import '../../Css/DoctorsApproval.css'
import AcceptIcon from '../Icon/AcceptIcon';
import RejectIcon from '../Icon/RejectIcon';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';

const DoctorApproval = () => {

    const [auth,setAuth] = useAuth();
    const [doctors,setDoctors] = useState([]);
    const navigate = useNavigate();
    const [accept , setAccept] = useState(0);

    useEffect(()=>{
        const GetDoctors = async()=>{
            try{
                const response = await axios.get(getapplieddoctorsapi);
                if(response && response.data.success){
                  console.log(response.data.Doctors)
                    setDoctors(response.data.Doctors);
                }else{
                    setDoctors([]);
                }
            }catch(error){
                console.log(error);
                setDoctors([]);
            }
        }

        GetDoctors();
    },[auth && auth?.user]);

    const GetDetails = (id)=>{
        navigate(`/single-profile/${id}`);
    }

    const AcceptUpdate = async(id)=>{
        const formData = new FormData();
        formData.append('userId',id)
        const response = await toast.promise(
            axios.put(acceptdoctorapi , formData, {
                withCredentials: true ,
                headers : {
                    "Content-Type": "multipart/form-data",
                }
            }),
            {
                pending : 'Status Processing...',
                success : 'Status Updated Successfully',
                error : 'Something Went Wrong'
            }
        );
        console.log(response);
        if(response && response.data.success){
            const updateddoctors = doctors.filter((doc)=>doc?.userId?._id!==id);
            setDoctors(updateddoctors);
        }else{
            setDoctors([]);
        }
    }

    const RejectUpdate = async(id)=>{
        const formData = new FormData();
        formData.append('userId',id);
        const response = await toast.promise(
            axios.put(rejectdoctorapi , formData , {
                withCredentials: true,
                headers : {
                    "Content-Type": "multipart/form-data",
                }
            }),
            {
                pending : 'Status Processing...',
                success : 'Status Updated Successfully',
                error : 'Something Went Wrong'
            }
        )
        if(response && response.data.success){
            const updateddoctors = doctors.filter((doc)=>doc?.userId?._id !==id);
            setDoctors(updateddoctors);
        }else{
            setDoctors([]);
        }
    }


  return (
    <>
      <AdminNavbar/>
      {!(auth && auth?.user) ? (<Loading/>) : (
        <section className = "doctors-section">
          <h3 className = "all-doctors font-semibold">Applied Doctors</h3>
          <div className = "doctors-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Information</th>
                  <th>Status</th>
                </tr>
              </thead>
                <tbody>
                {doctors.map((doc,index)=>{
                  return (
                    <tr key = {index}>
                      <td className = "text-sm text-center">{`${doc?.userId?.firstname} ${doc?.userId?.lastname}`}</td>
                      <td className = "text-sm text-center">{doc?.userId?.email}</td>
                      <td onClick ={()=>GetDetails(doc?._id)} className = "special-td text-center"><span>Details</span></td>
                      <td>
                        <div className = "do-work">
                            <div className = "accept" onClick = {()=>AcceptUpdate(doc?.userId?._id)}><AcceptIcon/></div>
                            <div className = "reject" onClick ={()=>RejectUpdate(doc?.userId?._id)}><RejectIcon/></div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <ToastContainer/>
        </section>
      ) }
    </>
  )
}

export default DoctorApproval