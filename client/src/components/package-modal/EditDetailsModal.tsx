import colors from '../../common/colors'
import React from 'react'
import {AiFillCloseCircle, AiFillDelete} from "react-icons/ai"
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../assets/css/card.css"
import { BsDot } from "react-icons/bs";

interface EditDetailsModalProps {
    onClose: () => void;
    packageID: string;
    packageName: string;
    description: string;
    tags: string[];
    price: string;
    visibility: string;
    items: string[];
  }

  const EditDetailsModal: React.FC<EditDetailsModalProps> = ({ onClose,  packageID, packageName, description, price, tags, visibility, items }) => {;
    return (
    <div className=''>
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] backdrop-blur-sm animate-zoom-in overflow-hidden'>
    <div className='flex justify-center align-center my-20'>
        <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl">
            <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black'> {/*this is the header for the modal*/}
                <div className='flex start items-center'><p><b>Package ID:</b>{packageID}</p></div>
                <div className='flex justify-end'><button onClick={onClose} className='flex items-center text-3xl '><AiFillCloseCircle className='mx-2 detailsClose'/></button></div>
            </div>
            <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000]">
            <div>
            <div className='h-[40vh] '>
                <p><b>Package Name: </b><input type="text" defaultValue={packageName} className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Total Price: </b> <input type="text" defaultValue={price} className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Available From: </b> <input type="date" className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Expiry Date: </b> <input type="date" className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Tags: </b> <input type="text" defaultValue={tags} className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input>
                
                </p>
                <p><b>Visibility: </b>
                        <select id="sortDropdown" name="sortDropdown" className={`h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4`}>
                        <option defaultValue="Visible">Visible</option>
                        <option defaultValue="Hidden">Hidden</option>
                    </select>
                    </p>
                <p><b>Description: </b></p>
                <textarea className="w-[80%] h-[25%] overflow-y-auto" defaultValue={description}></textarea>
            </div>
            <div className='my-4'>
                    <p><b>Items: </b>
                    <input type="text" defaultValue={items} className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input>
                    </p>
                </div>
            </div>
            <div className='IMAGE_PLACEHOLDER bg-slate-600 block w-3/5 h-3/5 rounded-2xl'></div>

            </div>
            <div className='flex justify-end items-center h-[5vh]'>{/*This is the footer*/}
                <button className='w-[5vw] h-[4vh] mx-5 rounded-md bg-[#e14f4c] flex items-center justify-center'><AiFillDelete/>Delete</button>
                <button className='w-[5vw] h-[4vh] bg-[#7dc72d] mx-5 rounded-md flex items-center justify-center'><HiMiniPencilSquare/>Save</button>

            </div>
        </div>

    </div>
    </div>
    </div>
  )
}

export default EditDetailsModal