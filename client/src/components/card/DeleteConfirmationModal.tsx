import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirmDelete: () => void;
  alertMsg: (msg:string)=>void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onClose,
  onConfirmDelete,
  alertMsg
}) => {
  return (
    <div>
      <div className='absolute inset-0 z-10 bg-[rgba(0,0,0,0.4)] w-full h-full flex justify-center items-center backdrop-blur-sm'>
        <div className="delete-confirmation-modal bg-white rounded-lg w-[20%] h-auto p-2 z-20">
          <div className="delete-confirmation-content">
            <div className='flex justify-center xl:max-2xl:text-[0.8em]'><p>Are you sure you want <br></br>to delete this package?</p></div>
            <div className="delete-confirmation-buttons flex justify-center my-4 space-x-4 xl:max-2xl:text-[0.7em]">
              <button className="bg-[#1f8022] rounded-lg h-[3.5vh] w-[6vw] hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in text-white" onClick={onClose}>Cancel</button>
              <button className="bg-[#e14f4c] rounded-lg h-[3.5vh] w-[6vw] hover:bg-[#ff5d5b] transition-colors delay-250 duration-[3000] ease-in text-white " onClick={()=>{
                alertMsg("Deleted!");
                onConfirmDelete();
                
              }}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
