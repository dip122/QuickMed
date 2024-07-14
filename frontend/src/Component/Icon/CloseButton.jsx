import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

const CloseButton = ({setOpenModal}) => {

    const handleClick = ()=>{
        setOpenModal(false);
    }
  return (
    <div style={{ fontSize: '24px', cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }} onClick = {handleClick}>
      <IoCloseOutline />
    </div>
  );
};

export default CloseButton;
