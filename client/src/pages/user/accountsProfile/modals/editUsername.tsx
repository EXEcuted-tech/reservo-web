import React, { useState } from 'react';
import { BsFillPencilFill } from "react-icons/bs";


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

    }

    return (
        <>
        
            {isEdit ? (
                <div className="w-[5cm] h-[5cm] bg-white flex flex-row border border-black">
                    <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            ) : (
                <button onClick={handleEditClick}><BsFillPencilFill className="ml-1"/></button>
            )}
            
        </>
    );
}
