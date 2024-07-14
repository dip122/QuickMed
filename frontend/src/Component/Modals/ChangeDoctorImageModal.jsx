import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../Context/Context';
import { updatedoctorimageapi } from '../../Apis/Apiroutes';

const ChangeDoctorImageModal = ({isopen, toggleModal}) => {

  const [image, setImage] = useState(null);
  const [wentwrong,setwentwrong] = useState("");
  const [auth,setAuth] = useAuth();

  const handelSubmit = async(e)=>{
    e.preventDefault();
    if(!image){
      setwentwrong('fail');
      return false;
    }
    try{
      if(auth && auth?.user){
        setwentwrong('wait');
        const formData = new FormData();
        formData.append('image',image);
        formData.append('public_id',auth?.user?.profile_pic?.public_id);
        const response = await axios.put(updatedoctorimageapi,formData , {
          withCredentials : true,
          headers : {
            "Content-Type" : "multipart/form-data"
          }
        })
        if(response && response.data.success){
          setwentwrong('success');
          setAuth({
            ...auth,
            user : response.data.user
          });
          const data = await JSON.parse(localStorage.getItem('Auth-Data'));
          data.user.profile_pic.public_id = response.data.user.profile_pic.public_id;
          data.user.profile_pic.url = response.data.user.profile_pic.url;
          await localStorage.removeItem('Auth-Data');
          await localStorage.setItem('Auth-Data', JSON.stringify(data));

          return true;
        }else{
          setwentwrong('fail');
          return false;
        }
      }
    }catch(error){
      console.log(error);
      setwentwrong('fail');
      return false;
    }
  }

  
  return (
    <div className = {`${isopen ? 'flex' : 'hidden'}
      justify-center items-center fixed top-0 left-0 right-0 z-30 bg-opacity-70 bg-neutral-900 overflow-y-auto overflow-x-hidden w-full h-full`}>
        <form className = "flex justify-center items-center flex-col gap-8 p-5 bg-neutral-300" onSubmit= {handelSubmit}>
          <label className = "font-semibold text-base">Enter Profile Image</label>
          <input
           type = "file"
           placeholder = "Select Image"
           name = "image"
           onChange = {(e)=>setImage(e.target.files[0])}
          />
          <div className = "flex flex-row gap-4 p-2">
            <button type = "submit" className = "bg-purple-500 hover:bg-purple-600 px-5 py-2 text-white font-semibold rounded-full">Submit</button>
            <button className = "bg-purple-500 hover:bg-purple-600 px-5 py-2 text-white font-semibold rounded-full" onClick={toggleModal}>Close</button>
          </div>
          {wentwrong === 'fail' ? <div className = "text-center">something went wrong</div> : wentwrong === 'success' ? <div className = "text-center">Updated Image</div> : wentwrong === 'wait' && <div className = "text-center font-semibold">wait...</div>}
        </form>
      </div>
  )
}

export default ChangeDoctorImageModal