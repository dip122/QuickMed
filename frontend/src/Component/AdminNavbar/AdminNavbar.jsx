import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from '../SideBar/SideBar';
import '../../Css/AdminNavbar.css'
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const [opensidebar,setopensidebar] = useState(true);
    const navigate = useNavigate();
    const toggleSidebar = ()=>{
        setopensidebar(!opensidebar);
        return opensidebar;
    }

  return (
    <>
    <div className = "navbar-section">
        <div className = "sidebar-section">
            <Sidebar isopen={opensidebar}/>
        </div>
        <div className = {`${opensidebar === true ? 'close-navbar' : 'open-navbar'}`} >
            <nav className="navbar flex items-center">
                <i className="fa-solid fa-bars" onClick = {toggleSidebar}/>
            </nav>
        </div>
    </div>
    </>

  )
}

export default AdminNavbar