import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Context'
import Loading from '../Loading/Loading';
import axios from 'axios';
import { deleteuserapi, getalluserapi } from '../../Apis/Apiroutes';
import '../../Css/User.css';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '../Icon/DeleteIcon';
import AdminNavbar from '../AdminNavbar/AdminNavbar';

const Users = () => {

    const [auth,setAuth] = useAuth();
    const [element , setElement] = useState([]);

    useEffect(()=>{
        const GetAllUsers = async()=>{
            try{
                const response = await axios.get(getalluserapi);
                if(response && response.data.success){
                    setElement(response.data.user);
                    console.log(response.data)
                }else{
                    setElement([]);
                }
            }catch(error){
                console.log(error);
                setElement([]);
            }
        }

        GetAllUsers();
    },[auth && auth?.user]);

    const DeleteProfile = async(id)=>{
        const response = await toast.promise(
            axios.delete(deleteuserapi,{
                data : { userId : id}
            }),
            {
                pending : 'Please Wait...',
                success : 'Deleted Successfully',
                error : 'Something Went Wrong'
            }
        );

        if(response && response.data.success){
            const updateduser = element.filter((ele)=>ele._id !==id);//update the element field so that real time present users can be seen 
            setElement(updateduser);
        }
    }


  return (
    <>
        <AdminNavbar/>
        {!(auth && auth?.user) ?  (
            <Loading/>
        ) : (
            <section className = "doctors-section">
                <h3 className = "user-header font-semibold">Users</h3>
                <div className = "doctors-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Pic</th>
                                <th>Name</th>
                                <th>Details</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {element.length >0 && element.map((ele,index)=>{
                                return (
                                    <tr key = {index}>
                                        <td><img src ={ele?.profile_pic?.url} alt='user' className = "h-14 w-12"/></td>
                                        <td className = "text-sm">{`${ele?.firstname} ${ele?.lastname}`}</td>
                                        <td className = "text-sm">{`${ele?.email} | ${ele.contact}`}</td>
                                        <td className = "text-sm">{ele?.address}</td>
                                        <td onClick = {()=>DeleteProfile(ele._id)}><DeleteIcon/></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <ToastContainer/>
            </section>
        )}
    </>
  )
}

export default Users;