import colors from '../../../common/colors'
import React, {useState} from 'react'
import {AiFillCloseCircle, AiFillDelete} from "react-icons/ai"
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import {LuPackage2} from "react-icons/lu";
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

    const handleDeleteClick = () => {
      setDeleteModal(true);
    };
    const handleConfirmDelete = async () => {
      try {
          const response = await axios.post(`${config.API}/package/delete/`,{
              package_id: packageID,
  
          }).then(response=>{
              console.log(response);
          })
  
          console.log('Delete request successful:', response);}
      catch(error:any|undefined){
          console.log('Error deleting package:', error);
          console.log('Status Code:', error.response?.status);
      }
      onClose();
      setDeleteModal(false);
      
    };
  
  
    const handleCloseDeleteModal = () => {
      setDeleteModal(false);
    };

      const closeModal = () => {
        setIsModalOpen(false);
      };
    
    const openEditModal = ()=>{
        setIsModalOpen(false);
        setIsEditModalOpen(true);
      };
    
      const closeEditModal = ()=>{
        setIsEditModalOpen(false);
      };


    return (
    <div>
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-full overflow-x-hidden backdrop-blur-sm animate-zoom-in overflow-hidden'>
    <div className='flex justify-center align-center my-20'>
          <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl">
          {deleteModal && (
        <DeleteConfirmationModal
          onClose={handleCloseDeleteModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
            <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black'> {/*this is the header for the modal*/}
                <div className='flex start items-center text-2xl mb-4 font-bold'>
                  <LuPackage2 className="text-4xl mr-[2%]"/>
                  <p>Package ID: {packageID}</p>
                </div>
                <div className='flex justify-end mb-4'><button onClick={onClose} className='flex items-center text-3xl '><AiFillCloseCircle className='mx-2 detailsClose'/></button></div>
            </div>
            <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000]">
            <div>
            <div className='h-[40vh] text-xl '>
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
            <div className='my-4 text-xl'>
                    <p><b>Items: </b>
                    <ul className='list-disc  ml-[6%]'>
                    {items.map((tag, index) => (
                                            <li key={index} className=''>{tag}</li>
                                        ))}
                                    
                    </ul>
                    </p>
                </div>
            </div>
            <div className='IMAGE_PLACEHOLDER block w-[50%] h-[50%] rounded-2xl'>
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
            <div className='flex justify-end items-center h-[3vh]'>{/*This is the footer*/}
                <button className='w-[8vw] h-[4vh] mx-5 rounded-md text-[1.1rem] bg-[#e14f4c] flex items-center justify-center hover:bg-[#ff5d5b] transition-colors delay-250 duration-[3000] ease-in' 
                  onClick={handleDeleteClick}><AiFillDelete className="mr-[3%]"/>Delete</button>
                <button className='w-[8vw] h-[4vh] text-[1.1rem] bg-[#efb953] mx-5 rounded-md flex items-center justify-center hover:bg-[#ffcf76] transition-colors delay-250 duration-[3000] ease-in' 
                  onClick={openEditModal}><HiMiniPencilSquare className="mr-[3%]"/>Edit</button>
                {isEditModalOpen && 
                <EditDetailsModal    
                onClose={closeEditModal}
                packageID={packageID} 
                packageName={packageName} 
                price={price} 
                description={description} 
                tags={tags} 
                visibility={visibility} 
                items={items} // Handle empty or null item_list 
                dateStart={date_start} 
                dateEnd={date_end} 
                timeStart={time_start} 
                timeEnd={time_end} 
                filePath={filePath}/>}
            </div>
        </div>

    </div>
    </div>
    </div>
  )
}

export default DetailsModal