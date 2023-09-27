import React, { useState } from 'react'
import colors from '../../common/colors'
import { FaIcons } from 'react-icons/fa'
import { AiFillDownCircle } from "react-icons/ai";
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../assets/css/card.css"
import DetailsModal from '../package-modal/DetailsModal';
import EditDetailsModal from '../package-modal/EditDetailsModal';



interface prop {
    packageID: string;
    packageName: string;
    price: string;
    description: string;
    tags: string[];
    visibility: string;
    items: string[];
}

const Card: React.FC<prop>=({packageID, packageName, price, description, tags, visibility, items}) => {
const [isModalOpen, setIsModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = ()=>{
    if (isModalOpen == true){
        closeModal();
    }
    setIsEditModalOpen(true);
  };

  const closeEditModal = ()=>{
    setIsEditModalOpen(false);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


    return (
        <div className='Card mx-5 my-5 w-[18vw]'>
                <div className="">
                <div className='CardImage flex flex-col h-[100%]'>IMAGE</div>
                <p className="text-xl my-1 text-center font-bold flex flex-col">{packageName}</p>
                <p className='text-sm mx-8 h-[25%] first-letter:text-justify indent-5 flex flex-col'>{description}</p>
                <div className='h-20 flex flex-col items-center'>
                <p className="text-xl my-5 text-center font-bold">PHP {price}</p>
                <div className="mx-10 flex space-x-5 items-center">
                <button className='CardButton flex DetailsButton w-1/2 items-center justify-center' onClick={openModal}><HiOutlineMagnifyingGlass/>Details</button>
                {isModalOpen && <DetailsModal onClose={closeModal} packageID={packageID} packageName={packageName} price={price} description={description} tags={tags} visibility={visibility} items={items} openEditModal={function (): void {
                throw new Error('Function not implemented.');
              } }/>}
                <button className='CardButton flex EditButton w-1/2 items-center justify-center' onClick={openEditModal} ><HiMiniPencilSquare/>Edit</button>
                {isEditModalOpen && <EditDetailsModal onClose={closeEditModal} packageID={packageID} packageName={packageName} price={price} description={description} tags={tags} visibility={visibility} items={items}/>}
                </div>
                </div>
                </div>
            </div>
    )
}

export default Card