import React, { useEffect, useState } from 'react'
import {useAuth} from '../Context/Context'
import axios from 'axios';
import {Outlet} from 'react-router-dom';
import Loading  from '../Component/Loading/Loading';

const UserRouter = () => {

    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const AuthCheck = async()=>{
            try{
                if(auth && auth?.user?.role === 0){
                    setOk(true)
                }else{
                    setOk(false);
                }
            }catch(error){
                console.log(error);
                setOk(false);
            }
        }
        if(auth && auth?.user){
            AuthCheck();
        }
    },[auth && auth?.user])
  return (
    ok ? <Outlet/> : <Loading/>
  )
}

export default UserRouter