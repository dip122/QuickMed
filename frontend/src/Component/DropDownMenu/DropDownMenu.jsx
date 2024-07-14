import React, { useState } from 'react'
import { RiLockPasswordLine } from "react-icons/ri";
import { PiAddressBook } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";
import { useAuth } from '../../Context/Context';
import { FaUserDoctor } from "react-icons/fa6";
import ChangePasswordModal from '../Modals/ChangePasswordModal';
import ChangeAddressModal from '../Modals/ChangeAddressModal';
import ChangeDoctorImageModal from '../Modals/ChangeDoctorImageModal';
import { useNavigate } from 'react-router-dom';

const DropDownMenu = () => {

    const [auth,setAuth] = useAuth();
    const [isOpenPasswordModal , setIsOpenPasswordModal] = useState(false);
    const [isOpenAddressModal,setIsOpenAddressModal] = useState(false);
    const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
    const [isOpenDoctorImageModal,setIsOpenDoctorImageModal] = useState(false);
    const navigate = useNavigate();

    const togglePassowrdMenu = ()=>{
        setIsOpenPasswordModal(!isOpenPasswordModal);
    }
    const toggleAddressMenu = ()=>{
        setIsOpenAddressModal(!isOpenAddressModal);
    }
    const toggleDoctorImageMenu = ()=>{
        setIsOpenDoctorImageModal(!isOpenDoctorImageModal);
    }
    const handleClick = ()=>{
        navigate('/userprofile');
    }
  return (
    <div id = "dropdown-menu"
     className = "absolute right-0 top-12 z-10 w-64 p-2 space-y-1 rounded-lg shadow-lg text-sm text-neutral-800 divide-neutral-800 border border-neutral-300 bg-neutral-200">
        <ul>
            <li>
                <div className = "flex flex-row justify-center items-center p-3 gap-4 cursor-pointer hover:bg-neutral-300" onClick ={togglePassowrdMenu}>
                    <RiLockPasswordLine className = "h-6 w-6"/>
                    <div className = "flex-1 overflow-hidden text-ellipsis">ChangePassowrd</div>
                </div>
                {isOpenPasswordModal && <ChangePasswordModal isopen= {isOpenPasswordModal} toggleModal = {togglePassowrdMenu}/>}
            </li>
            <li>
                <div className = "flex flex-row justify-center items-center p-3 gap-4 cursor-pointer hover:bg-neutral-300" onClick = {toggleAddressMenu}>
                    <PiAddressBook className = "h-6 w-6"/>
                    <div className = "flex-1 overflow-hidden text-ellipsis">ChangeAddress</div>
                </div>
                {isOpenAddressModal && <ChangeAddressModal isopen= {isOpenAddressModal} toggleModal = {toggleAddressMenu}/>}
            </li>
            <li>
                <div className = "flex flex-row justify-center items-center p-3 gap-4 cursor-pointer hover:bg-neutral-300" onClick={handleClick}>
                    <AiOutlineProfile className = "h-6 w-6"/>
                    <div className = "flex-1 overflow-hidden text-ellipsis">My Profile</div>
                </div>

            </li>
            {(auth && auth?.user?.isDoctor === true) ? (
                <li>
                    <div className = "flex flex-row justify-center items-center p-3 gap-4 cursor-pointer hover:bg-neutral-300" onClick={toggleDoctorImageMenu}>
                        <FaUserDoctor className = "h-6 w-6"/>
                        <div className = "flex-1 overflow-hidden text-ellipsis">ChangeProfImg</div>
                    </div>
                    {isOpenDoctorImageModal && <ChangeDoctorImageModal isopen= {isOpenDoctorImageModal} toggleModal = {toggleDoctorImageMenu}/>}
                </li>
            ) : (<></>)}
        </ul>
    </div>
  )
}

export default DropDownMenu