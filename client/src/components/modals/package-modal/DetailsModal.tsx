import colors from '../../../common/colors'
import React, {useState} from 'react'
import {AiFillCloseCircle, AiFillDelete} from "react-icons/ai"
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../../assets/css/card.css"
import { BsDot } from "react-icons/bs";
import EditDetailsModal from './EditDetailsModal';

interface DetailsModalProps {
    onClose: () => void;
    openEditModal: ()=>void;
    packageID: string;
    packageName: string;
    description: string;
    tags: string[];
    price: string;
    visibility: string;
    items: string[];
  }

  
  const DetailsModal: React.FC<DetailsModalProps> = ({ onClose, packageID, packageName, description, price, tags, visibility, items }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
      };
    
    const openEditModal = ()=>{
        closeModal();
        setIsEditModalOpen(true);
      };
    
      const closeEditModal = ()=>{
        setIsEditModalOpen(false);
      };


    return (
    <div>
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] backdrop-blur-sm animate-zoom-in overflow-hidden'>
    <div className='flex justify-center align-center my-20'>
        <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl">
            <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black'> {/*this is the header for the modal*/}
                <div className='flex start items-center'><p><b>Package ID:</b> {packageID}</p></div>
                <div className='flex justify-end'><button onClick={onClose} className='flex items-center text-3xl '><AiFillCloseCircle className='mx-2 detailsClose'/></button></div>
            </div>
            <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000]">
            <div>
            <div className='h-[40vh] '>
                <p><b>Package Name: </b>{packageName}</p>
                <p><b>Total Price: </b> {price}</p>
                <p><b>Available From: </b></p>
                <p><b>Expiry Date: </b></p>
                <p><b>Tags: </b>{tags.map((tag, index) => (
                                            <span key={index}>{tag}{index < tags.length - 1 ? ', ' : ''}</span>
                                        ))}
                                        
                
                </p>
                <p><b>Visibility: </b>{visibility}</p>
                <p><b>Description: </b></p><p>{description}</p>
            </div>
            <div className='my-4'>
                    <p><b>Items: </b>
                    <ul className='list-disc'>
                    {items.map((tag, index) => (
                                            <li key={index} className=''>{tag}</li>
                                        ))}
                                    
                    </ul>
                    </p>
                </div>
            </div>
            <div className='IMAGE_PLACEHOLDER bg-slate-600 block w-3/5 h-3/5 rounded-2xl'></div>

            </div>
            <div className='flex justify-end items-center h-[5vh]'>{/*This is the footer*/}
                <button className='w-[5vw] h-[4vh] mx-5 rounded-md bg-[#e14f4c] flex items-center justify-center'><AiFillDelete/>Delete</button>
                <button className='w-[5vw] h-[4vh] bg-[#efb953] mx-5 rounded-md flex items-center justify-center' onClick={openEditModal}><HiMiniPencilSquare/>Edit</button>
                {isEditModalOpen && <EditDetailsModal onClose={closeEditModal} packageID={packageID} packageName={packageName} price={price} description={description} tags={tags} visibility={visibility} items={items}/>}

            </div>
        </div>

    </div>
    </div>
    </div>
  )
}

export default DetailsModal