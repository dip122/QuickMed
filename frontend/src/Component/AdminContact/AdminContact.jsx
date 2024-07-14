import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import { useAuth } from '../../Context/Context';
import axios from 'axios';
import { deletecontactapi, getcontactapi } from '../../Apis/Apiroutes';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EmptyPage from '../Empty/EmptyPage';
import DeleteIcon from '../Icon/DeleteIcon';

const AdminContact = () => {

    const [contacts,setcontacts] = useState([]);
    const [Loading,setLoading] = useState(true);

    const [auth,setAuth] = useAuth();
    useEffect(()=>{
        const GetContacts = async()=>{
            try{
                const response = await axios.get(getcontactapi);
                if(response && response.data.success){
                    setcontacts(response.data.contacts);
                }else{
                    setcontacts(response.data.contact)
                }
            }catch(error){
                console.log(error);
            }
        }

        if(auth && auth?.user){
            GetContacts();
            setLoading(false);
        }
    },[auth && auth?.user]);

    const DeleteContact = async(id)=>{
        try{
            const url = deletecontactapi + id;
            const response = await toast.promise(
                axios.delete(url),{
                    pending : "Deleting...",
                    error : "some error has occured"
                }
            ) ;;
            if(response && response.data.success){
                toast.success("Successfully Deleted");
                setcontacts((prevcontact)=>prevcontact.filter((contact)=>contact._id !== id));
                
            }else{
                toast.error("Some error has occured")
            }
        }catch(error){
            console.log(error);
            toast.error("Server side error");
        }
    }
  return (
    <>
        <AdminNavbar/>
        {!(auth && auth?.user) ? (<EmptyPage/>) : (
            <section className = "doctors-section">
                <h3 className = "font-semibold">Contacted Users</h3>
                <div className = "doctors-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts && contacts.map((contact,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.description}</td>
                                        <td>
                                            <div className = "p-2" onClick = {()=>DeleteContact(contact?._id)}><DeleteIcon/></div>
                                        </td>
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

export default AdminContact