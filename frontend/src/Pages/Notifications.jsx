import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/Context';
import Loading from '../Component/Loading/Loading';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/userappointments.css';
import Navbar from '../Component/Navbar/Navbar';
import { deleteNotificationapi, notificationsapi, socketurl } from '../Apis/Apiroutes';
import DeleteIcon from '../Component/Icon/DeleteIcon';
import EmptyPage from '../Component/Empty/EmptyPage';
import { io } from 'socket.io-client';
var socket

const Notifications = () => {
    const [auth, setAuth] = useAuth();
    const [notification, setNotification] = useState([]);
    const [socketConnected,setsocketConnected] = useState(false);

    useEffect(() => {
        const getallnotification = async () => {
            try {
                const response = await axios.get(notificationsapi);
                if (response && response.data.success) {
                    setNotification(response.data.notifications);
                    console.log(response.data.notifications);
                } else {
                    setNotification([]);
                }
            } catch (error) {
                console.log(error);
                setNotification([]);
            }
        };
        if(auth && auth?.user){
            getallnotification();
        }
    }, [auth && auth?.user]);

    useEffect(()=>{
        if(auth && auth?.user){
            const socket = io(socketurl,{
                withCredentials : true,
            });

            if(notification){
                socket.emit('setup','Notification_handle');
            }
            socket.on('connection',()=>{
                // console.log('socket connected');
                setsocketConnected(true);
            });

            socket.on('UpdatedNotification',(data)=>{
                // console.log('socket working');
                if(data.id === auth?.user?._id){
                    let Notification = data.Notification
                    console.log(data.id);
                    console.log(auth?.user);
                    console.log("yes entered")
                    setNotification((prevNotification)=>[...prevNotification, Notification]);
                }
            })


        }
    },[notification]);


    const DeleteNotifications = async(id)=>{
        try{
            const url = deleteNotificationapi + id;
            const response = await toast.promise(
                axios.delete(url),{
                    pending : 'Delete Processing'
                }
            );
            if(response && response.data.success){
                // const updatedNotifications = notification.map((notify)=>notify._id !== id);
                setNotification(notification.filter((notify)=>notify._id !== id));
                window.location.reload();
                toast.success(response.data.message);
            }else{
                setNotification([]);
            }
        }catch(error){
            console.log(error);
            setNotification([]);
        }
    }

    return (
        <>
            <Navbar />
            {!auth?.user || notification.length === 0 ? (
                <EmptyPage />
            ) : (
                <section className="user-appointments">
                    <h3 className="appointments-heading font-semibold">Notifications</h3>
                    <div className="appointments-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notification.length>0 && notification.map((notify, index) => (
                                    <tr key={index}>
                                        <td>{`${auth?.user?.firstname} ${auth?.user?.lastname}`}</td>
                                        <td>{notify?.message}</td>
                                        <td onClick = {()=>DeleteNotifications(notify._id)}><DeleteIcon/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ToastContainer />
                </section>
            )}
        </>
    );
};

export default Notifications;
