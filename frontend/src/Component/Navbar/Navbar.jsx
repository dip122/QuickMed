import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Context';
import { FaRegUser } from "react-icons/fa";
import DropDownMenu from '../DropDownMenu/DropDownMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [isOpenMenu,setIsOpenMenu] = useState(false);
  const [isopendropdownmenu,setisopendropdownmenu] = useState(false);

  const toggleMenu = ()=>{
    setIsOpenMenu(!isOpenMenu)
  }

  const toggledropdownmenu = ()=>{
    setisopendropdownmenu(!isopendropdownmenu);
  }
  const handleLogout = async()=>{
    const data = await localStorage.getItem('Auth-Data');
    if(data){
        localStorage.removeItem('Auth-Data');
    }
    navigate('/');
    window.location.reload()
  }

  return (
    <section className="bg-white py-3">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div className="w-16">
          <div className="Navbar-header cursor-pointer text-lg font-semibold">BiteAndSlice</div>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center gap-[4vw]">
            {(auth && auth?.user?.role === 0) ? (
                <>
                    <li>
                        <Link to="/" className="hover:text-gray-500 text-sm font-semibold">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/application" className="hover:text-gray-500 text-sm font-semibold">ApplyForDoctor</Link>
                    </li>
                    <li>
                        <Link to="/doctorslist" className="hover:text-gray-500 text-sm font-semibold">Doctors</Link>
                    </li>
                    <li>
                        <Link to="/user-appointments" className="hover:text-gray-500 text-sm font-semibold">Appointment</Link>
                    </li>
                    <li>
                        <Link to="/user-notifications" className="hover:text-gray-500 text-sm font-semibold">Notifications</Link>
                    </li>
                    <li>
                        <Link to="/get-pres" className="hover:text-gray-500 text-sm font-semibold">Prescriptions</Link>
                    </li>
                    <li>
                        <Link to="/addpres" className="hover:text-gray-500 text-sm font-semibold">AddPres</Link>
                    </li>
                </>
            ) : (
                (auth && (auth?.user?.role === 1)) ?(
                    <>
                        <li>
                            <Link to="/adminDashboard" className="hover:text-gray-500 text-sm font-semibold">Admin</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/" className="hover:text-gray-500 text-sm font-semibold">Home</Link>
                        </li>
                    </>
                )
            )}
          </ul>
        </div>
        <div className=" hidden md:block md:flex md:items-center md:gap-x-4">
            {(auth && (auth?.user?.role === 0)) ? (
                <>
                    <div className = "flex-grow" onClick = {handleLogout}>
                        <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base">Logout</button>
                    </div>
                    <div className = "relative">
                        <button
                         id = "dropdown-user-menu"
                         type = "button"
                         className = "p-1.5 rounded-full hover:bg-neutral-200"
                         onClick={toggledropdownmenu}
                        >
                            <FaRegUser className = "rounded-full h-7 w-7 text-neutral-800"/>
                        </button>
                        {isopendropdownmenu && <DropDownMenu id = "dropdown-menu"/>}
                    </div>
                </>
            ) : (
                ((auth && auth?.user?.role === 1) ? (
                    <>
                        <div className = "flex-grow" onClick = {handleLogout}>
                            <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base">Logout</button>
                        </div> 
                    </>
                ) : (
                    <>
                        <div className = "flex-grow" onClick = {()=>navigate('/login')}>
                            <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base">Login</button>
                        </div>
                    </>
                ))
            )}
        </div>
        <div className="block md:hidden">
          <button onClick={toggleMenu} className="bg-purple-500 text-center text-white font-semibold py-2 px-5 hover:bg-purple-600 rounded-full">
            <div className="Menu">{isOpenMenu ? 'Close' : 'Open'}</div>
          </button>
        </div>
      </nav>
      <div
        className={`${
          isOpenMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } md:hidden navbar-acc overflow-hidden transition-all ease-in-out duration-300`}>
        <ul className="flex flex-col items-center gap-4 mt-4">
        {(auth && (auth?.user?.role === 0)) ? (
                <>
                    <li>
                        <Link to="/" className="hover:text-gray-500 text-base font-semibold">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/application" className="hover:text-gray-500 text-base font-semibold">ApplyForDoctor</Link>
                    </li>
                    <li>
                        <Link to="/doctorslist" className="hover:text-gray-500 text-base font-semibold">Doctors</Link>
                    </li>
                    <li>
                        <Link to="/user-appointments" className="hover:text-gray-500 text-base font-semibold">Appointment</Link>
                    </li>
                    <li>
                        <Link to="/user-notifications" className="hover:text-gray-500 text-base font-semibold">Notifications</Link>
                    </li>
                    <li>
                        <Link to="/get-pres" className="hover:text-gray-500 text-base font-semibold">Prescriptions</Link>
                    </li>
                    <li>
                        <Link to="/addpres" className="hover:text-gray-500 text-base font-semibold">AddPres</Link>
                    </li>
                    <li>
                        <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base" onClick={handleLogout}>Logout</button>
                    </li>
                </>
            ) : (
                (auth && auth?.user?.role === 1) ?(
                    <>
                        <li>
                            <Link to="/adminDashboard" className="hover:text-gray-500 text-lg font-semibold">Admin</Link>
                        </li>
                        <li>
                            <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base" onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/" className="hover:text-gray-500 text-lg font-semibold">Home</Link>
                        </li>
                        <li>
                            <button className="bg-purple-500 text-center text-white font-semibold rounded-full py-2 px-5 hover:bg-purple-600 text-base" onClick={()=>navigate('/login')}>Login</button>
                        </li>
                    </>
                )
            )}
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
