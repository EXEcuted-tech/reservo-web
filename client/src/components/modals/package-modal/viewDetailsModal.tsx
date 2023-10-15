import colors from '../../../common/colors'
import React, {useState} from 'react'
import {AiFillCloseCircle, AiFillDelete} from "react-icons/ai"
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../../assets/css/card.css"
import { BsDot } from "react-icons/bs";
import EditDetailsModal from './EditDetailsModal';
import axios from 'axios'
import config from '../../../common/config';
import DeleteConfirmationModal from '../../card/DeleteConfirmationModal';

interface DetailsModalProps {
    onClose: () => void;
    openEditModal: ()=>void;
    packageID: string;
    packageName: string;
    description: string;
    date_start: Date;
    date_end: Date;
    tags: string[];
    price: string;
    visibility: string;
    items: string[];
    time_start: string;
    time_end: string;
    filePath: string;
  }

  
const DetailsModal: React.FC<DetailsModalProps> = ({ onClose, packageID, packageName,date_start, date_end, description, price, tags, visibility, items, time_start, time_end, filePath }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    return (
    <div>
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100%] backdrop-blur-sm animate-zoom-in overflow-hidden'>
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
                <p><b>Available From: </b>{date_start.toDateString()}</p>
                <p><b>Expiry Date: </b>{date_end.toDateString()}</p>
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
            <div className='IMAGE_PLACEHOLDER bg-slate-600 block w-[20vw] h-[40vh] rounded-2xl'>
            <img
                src={filePath} // Use your image URL from the DB here
                alt="Package Image"
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                  e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                }}
                
                className="w-full h-full object-cover rounded-2xl"
                />
            </div>

            </div>
            <div className='flex justify-end items-center h-[5vh]'>{/*This is the footer*/}
               
                
                

            </div>
        </div>

    </div>
    </div>
    </div>
  )
}

export default DetailsModal