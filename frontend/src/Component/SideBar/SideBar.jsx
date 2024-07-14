import React from 'react'
import {
    FaHome,
    FaUser,
    FaEnvelope,
  } from "react-icons/fa";
  import { FaUserDoctor } from "react-icons/fa6";
  import { BiBookContent } from "react-icons/bi";
  import { FaUserAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import '../../Css/SideBar.css';

const SideBar = ({isopen}) => {

    const navigate = useNavigate();

    const elements = [
        {
            name : 'DashBoard',
            path : '/dashboard',
            icon : <FaHome/>
        },
        {
            name : 'Users',
            path : '/dashboard/user',
            icon : <FaUser/>
        },
        {
            name : 'Doctors',
            path : '/dashboard/doctors',
            icon : <FaUserDoctor/>
        },
        {
            name : "Appliactions",
            path : '/dashboard/doctors-approval',
            icon : <BiBookContent/>
        },
        {
            name : 'Appointments',
            path : '/dashboard/appointments',
            icon : <FaEnvelope/>
        },
        {
            name : 'Contacts',
            path : '/dashboard/contacts',
            icon : <FaUserAlt/>
        }
    ]

    const Logouthandle = ()=>{
        const data = localStorage.getItem('Auth-Data');
        if(data){
            localStorage.removeItem('Auth-Data');
        }
        navigate('/');
        window.location.reload()
    }
  return (
    <>
        <nav className = {`sidebar ${isopen ? 'translate-x-0' : '-translate-x-full'} duration-300 ease-in-out`}>
            <Link to = "/dashboard" className = "logo">Admin Panel</Link>
            <div className = "sidebar-container">
                <div className = "menu-content">
                    <ul className = "menu-items">
                        {elements && elements.map((ele,index)=>{
                            return (
                                <li className ="items" key={index}>
                                    <Link to = {ele.path} className = "menu-links">
                                        <div className = "menu-icons">{ele.icon}</div>
                                        <div className = "text font-semibold">{ele.name}</div>
                                    </Link>
                                </li>
                            )
                        })}

                    </ul>
                </div>
                <div className = "logout-container">
                    <div className = "text-logout">
                        <div className = "logout-section"><IoIosLogOut/></div>
                        <div className = "text-logout cursor-pointer" onClick = {Logouthandle}>Logout</div>
                    </div>
                </div>
            </div>

        </nav>
    </>
  )
}

export default SideBar