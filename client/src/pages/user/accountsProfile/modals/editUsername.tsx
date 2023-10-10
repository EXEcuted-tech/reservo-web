import React, { useState } from 'react';
import { BsFillPencilFill } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import { MdCancel } from "react-icons/md";


export default function EditUsername(props: { userName : string }){
    const [isEdit, setIsEdit] = useState(false);
    const [userName, setUserName] = useState(props.userName);

    const handleEditClick = () => {
        setIsEdit(true);
        console.log(isEdit);
    }

    const handleCancelClick = () => {
        setIsEdit(false);
    }

    const handleSaveClick = () => {
        // to write code for updating the database (i honestly dont wanna touch the controller, halppp)
        
        setIsEdit(false);
    }

    return (
        <>
            
            {isEdit ? (
                <div className="rounded-[10px] bg-[#EEEEEE] flex flex-row  row items-center w-[10cm] mx-[3vw]">
                    <input className="w-[7.8cm] ml-[0.3cm] bg-[#EEEEEE]"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                    <button className="h-[15pt] text-[25pt] px-[0.1cm] row flex justify-center items-center text-[#383838]" onClick={handleSaveClick}><HiCheck/></button>
                    <button className="h-[15pt] text-[18pt] row flex justify-center items-center text-[#383838]" onClick={handleCancelClick}><MdCancel/></button>
                </div>
            ) : (
                <h1>{userName}<button onClick={handleEditClick}><BsFillPencilFill className="ml-1"/></button></h1>
            )}
            
        </>
    );
}
