import React, { useState } from 'react'
import colors from '../../common/colors'
import { FaIcons } from 'react-icons/fa'
import { AiFillDownCircle } from "react-icons/ai";
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "./card.css"
import DetailsModal from '../package-modal/DetailsModal';


interface prop {
    packageName: string;
    price: string;
    description: string;
}

const Card: React.FC<prop>=({packageName, price, description}) => {
const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
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
                {isModalOpen && <DetailsModal onClose={closeModal} />}
                <button className='CardButton flex EditButton w-1/2 items-center justify-center'><HiMiniPencilSquare/>Edit</button>
                </div>
                </div>
                </div>
            </div>
    )
}

export default Card