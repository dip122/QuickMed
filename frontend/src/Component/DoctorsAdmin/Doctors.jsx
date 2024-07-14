import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Context'
import Loading from '../Loading/Loading';
import '../../Css/Doctors.css';
import axios from 'axios';
import { getalldoctorsapi} from '../../Apis/Apiroutes';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../Icon/DeleteIcon';
import AdminNavbar from '../AdminNavbar/AdminNavbar';

const Doctors = () => {

  const [auth,setAuth] = useAuth();
  const [doctors,setDoctors] = useState([]);
  const navigate = useNavigate();

  
  useEffect(()=>{
    const Getalldoctors = async()=>{
      try{
        const response = await axios.get(getalldoctorsapi);
        console.log('yes');
        if(response && response.data.success){
          setDoctors(response.data.Doctors);
          console.log(response.data)
        }else{
          setDoctors([]);
        }
      }catch(error){
        console.log(error);
        setDoctors([]);
      }
    }

    Getalldoctors();
  },[auth && auth?.user])

  const GetDetails = (id)=>{
    navigate(`/single-profile/${id}`);
  }


  return (
    <>
      <AdminNavbar/>
      {!(auth && auth?.user) ? (<Loading/>) : (
        <section className = "doctors-section">
          <h3 className = "doctors-header font-semibold">ALL Doctors</h3>
          <div className = "doctors-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
                <tbody>
                {doctors.map((doc,index)=>{
                  return (
                    <tr key = {index}>
                      <td>{`${doc?.userId?.firstname} ${doc?.userId?.lastname}`}</td>
                      <td>{doc?.userId?.email}</td>
                      <td onClick ={()=>GetDetails(doc?._id)} className = "special-td"><span>Details</span></td>
                      <td><div className = "delete-icons p-1"><DeleteIcon/></div></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) }
    </>
  )
}

export default Doctors