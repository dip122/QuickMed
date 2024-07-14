import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { doctorprofileapi } from '../../Apis/Apiroutes';
import { useAuth } from '../../Context/Context';
import Loading from '../Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Css/Profile.css';

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            const url = `${doctorprofileapi}${id}`;
            const response = await toast.promise(
                axios.get(url),
                {
                    success: 'Successfully Profile fetched',
                    error: 'Something went wrong'
                }
            );
            
            setProfile(response.data.doctor); // Assuming response.data.doctor is an array and you need the first item
            setOk(true);
        };
        getProfile();
    }, [auth?.user]);

    return (
        <>
            {ok ? (
                profile ? (
                    <div className="single-profile min-h-screen">
                        <div className="header">Doctor Profile</div>
                        <div className="section">
                            <div className="img-class"><img src={profile.userId.profile_pic.url} alt="profile" /></div>
                            <div className="section-right">
                                <p>FirstName: <span>{profile.userId.firstname}</span></p>
                                <p>LastName: <span>{profile.userId.lastname}</span></p>
                                <p>Contact: <span>{profile.userId.contact}</span></p>
                                <p>Email: <span>{profile.userId.email}</span></p>
                                <p>Address: <span>{profile.userId.address}</span></p>
                                <p>Specialization: <span>{profile.specialization}</span></p>
                                <p>Fees: <span>{profile.fees}</span></p>
                                <p>Registration: <span>{profile.registration}</span></p>
                                <p>Years of Experience: <span>{profile.experience}</span></p>
                            </div>
                        </div>
                        <div className="certificate-section">
                            <div className="certificate-label">Certificate</div>
                            <img src={profile.Certificate.url} alt="certificate" />
                        </div>
                        <ToastContainer />
                    </div>
                ) : (
                    <Loading />
                )
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Profile;
