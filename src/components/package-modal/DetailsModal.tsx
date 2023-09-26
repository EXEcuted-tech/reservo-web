import colors from '../../common/colors'
import React from 'react'
import {AiFillCloseCircle} from "react-icons/ai"

interface DetailsModalProps {
    // Define any props you need for the modal here
    // For example, you might need some data to display in the modal
    // You can also define a function to close the modal.
    // You can add more props as needed.
    onClose: () => void;
  }

  const DetailsModal: React.FC<DetailsModalProps> = ({ onClose }) => {
    return (
    <div className=''>
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh]'>
    <div className='flex justify-center align-center my-20'>
        <div className="w-[75vw] h-[70vh] bg-white p-10">
            <button onClick={onClose} className='flex justify-self-end items-center text-3xl'><AiFillCloseCircle className='mx-2'/></button>
        </div>

    </div>
    </div>
    </div>
  )
}

export default DetailsModal