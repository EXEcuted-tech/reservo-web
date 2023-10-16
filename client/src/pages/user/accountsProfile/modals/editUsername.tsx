import React, { useState } from 'react';
import { BsFillPencilFill } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import config from "../../../../common/config"


export default function EditUsername(props: { userName : string, userID : number }){
    const [isEdit, setIsEdit] = useState(false);
    const [userName, setUserName] = useState(props.userName);
    const [userID, setUserID] = useState(props.userID);

    const handleEditClick = () => {
        setIsEdit(true);
        console.log(isEdit);
    }

    const handleCancelClick = () => {
        setIsEdit(false);
    }

    const editProfile = async () => {
        const result = await axios.post(`${config.API}/user/edit`, {
            "account_name" : userName,
        }, {params: {userID: userID}}
        );
    }

    const handleSaveClick = () => {
        // to write code for updating the database (i honestly dont wanna touch the controller, halppp)
        editProfile();
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
                <div className='flex flex-row w-[100%] justify-center'><h1>{userName}</h1><button onClick={handleEditClick}><BsFillPencilFill className="ml-1"/></button></div>
            )}
            
        </>
    );
}
