import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onClose,
  onConfirmDelete,
}) => {
  return (
    <div>
      <div className='absolute inset-0 z-10 bg-[rgba(0,0,0,0.4)] w-full h-full flex justify-center items-center backdrop-blur-sm'>
        <div className="delete-confirmation-modal bg-white rounded-lg w-[25%] h-auto p-2 z-20">
          <div className="delete-confirmation-content">
            <div className='flex justify-center'><p>Are you sure you want to delete this package?</p></div>
            <div className="delete-confirmation-buttons flex justify-center my-4 space-x-4">
              <button className="bg-[#7dc72d] rounded-lg h-[3.5vh] w-[6vw] duration-75 hover:border-black border-2" onClick={onClose}>Cancel</button>
              <button className="bg-[#e14f4c] rounded-lg h-[3.5vh] w-[6vw] duration-75 hover:border-black border-2 " onClick={onConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
