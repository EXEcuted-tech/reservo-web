import react, { useState } from 'react'
import { BsFillPencilFill } from "react-icons/bs";


export default function EditUsername(){
    const [modal, setModal] = useState(false);
    const [newName, setNewname] = useState("");

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <button 
            onClick={toggleModal}
            className = "w-[5cm]">
                <BsFillPencilFill className="ml-1"/>
            </button>
        </>
    )
}
