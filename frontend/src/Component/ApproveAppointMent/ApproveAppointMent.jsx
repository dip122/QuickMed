import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Context'
import Loading from '../Loading/Loading'
import axios from 'axios'
import { allappointmentsapi, completeappointmentapi } from '../../Apis/Apiroutes'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../../Css/ApproveAppointment.css'
import DeleteIcon from '../Icon/DeleteIcon'
import AdminNavbar from '../AdminNavbar/AdminNavbar'

const ApproveAppointMent = () => {

    const [auth, setAuth] = useAuth()
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const GetAllAppointments = async () => {
            try {
                const response = await axios.get(allappointmentsapi);
                if (response && response.data.success) {
                    setAppointments(response.data.appointments)
                    console.log(response.data.appointments)
                } else {
                    setAppointments([]);
                }
            } catch (error) {
                console.log(error);
                setAppointments([]);
            }
        }
        GetAllAppointments();

    }, [auth && auth?.user]);

    const handleSubmit = async (e, id, userid, doctorid) => {
        const newStatus = e.target.value;
        const formData = new FormData();
        formData.append('appointmentid', id);
        formData.append('userId', userid);
        formData.append('doctorId', doctorid);
        const response = await toast.promise(
            axios.put(completeappointmentapi, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }),
            {
                pending: 'Appointment processing',
                success: 'Appointment Approved',
                error: 'Something Went Wrong'
            }
        );
        if (response && response.data.success) {
            const updatedAppointments = appointments.map((app)=>
             app._id === id ? {...app , status : newStatus } : app)
            setAppointments(updatedAppointments);
        }
    }

    const DeleteAppointment = async()=>{
        try{
            await toast.promise()
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <AdminNavbar/>
            {!(auth && auth?.user) || appointments.length === 0 ? (<Loading />) : (
                <section className="doctors-section">
                    <h3 className="all-doctors font-semibold">Appointments Controller</h3>
                    <div className="doctors-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((app, index) => (
                                    <tr key={index}>
                                        <td>{`${app?.userId?.firstname} ${app?.userId?.lastname}`}</td>
                                        <td>{`${app?.doctorId?.firstname} ${app?.doctorId?.lastname}`}</td>
                                        <td>{app?.date}</td>
                                        <td>{app?.time}</td>
                                        <td>
                                            <select
                                                value={app?.status}
                                                onChange={(e) => handleSubmit(e, app?._id, app?.userId?._id, app?.doctorId?._id)}
                                                className={`select-class ${app.status === 'pending' ? 'pending-status' : 'completed-status'} p-1`}
                                                style={{ color: app.status === 'pending' ? 'black' : 'gray' }}
                                            >
                                                <option className={`${app.status === 'completed' ? 'disabled-appointment' : 'enable-appointment'}`} value="pending">Pending</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </td>
                                        <td><div onClick={()=>DeleteAppointment(app?._id)}><DeleteIcon/></div></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ToastContainer />
                </section>
            )}
        </>
    )
}

export default ApproveAppointMent
