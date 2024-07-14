import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/Context'
import Loading from '../Component/Loading/Loading'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { userappointment } from '../Apis/Apiroutes'
import '../Css/userappointments.css'
import Navbar from '../Component/Navbar/Navbar'
import EmptyPage from '../Component/Empty/EmptyPage'

const AppointMent = () => {

    const [auth, setAuth] = useAuth()
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const GetAllAppointments = async () => {
            try {
                const response = await axios.get(userappointment);
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


    return (
        <>
            <Navbar/>
            {!(auth && auth?.user) || appointments.length === 0 ? (<EmptyPage />) : (
                <section className="user-appointments">
                    <h3 className="appointments-heading font-semibold">Appointments</h3>
                    <div className="appointments-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((app, index) => (
                                    <tr key={index}>
                                        <td>{`${app?.userId?.firstname} ${app?.userId?.lastname}`}</td>
                                        <td>{`${app?.doctorId?.firstname} ${app?.doctorId?.lastname}`}</td>
                                        <td>{app?.date}</td>
                                        <td>{app?.time}</td>
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

export default AppointMent
