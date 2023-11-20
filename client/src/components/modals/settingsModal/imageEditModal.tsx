import React, { useState } from 'react';

interface ImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newImageUrl: string) => void;
}

const ImageEditModal: React.FC<ImageEditModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleSave = () => {
    onSave(newImageUrl);
  };

  return (
    <div className="z-[1002] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100%] h-[100%] backdrop-blur-sm animate-fade-in overflow-y-hidden">
    <div className={`modal absolute ${isOpen ? 'bg-[#F3F3F3] bottom-[45%] left-[25%] h-[20%] w-[30%] ml-[10%] p-6 drop-shadow rounded-3xl xs:max-sm:w-[45%]  xl:max-2xl:h-[25%]' 
    : 'hidden'}`}>
      <div className="modal-overlay " onClick={onClose}></div>

      <div className="modal-container">

        <div className="modal-body">
          <label className="block mb-2 text-lg font-semibold xs:max-sm:text-[0.6em] xl:max-2xl:text-[0.65em]">New Image URL:</label>
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-[0.6rem] w-[100%] xs:max-sm:h-[4vh] xl:max-2xl:text-[0.6em] xl:max-2xl:mb-[0.4rem] xl:max-2xl:h-[20%] focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="modal-footer mt-[2%] ml-[30%] xs:max-sm:ml-[7%] ">
          <button
            type="submit"
            className="btn btn-primary w-[5rem] text-white bg-[#1B6E1E] p-[0.30rem] text-[1.1rem] xs:max-sm:text-[0.6em] xl:max-2xl:text-[0.7rem] xs:max-sm:w-[3rem] xl:max-2xl:p-[0.05rem] xl:max-2xl:w-[4rem] items-center rounded-lg hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="btn btn-secondary w-[6rem] ml-[0.4rem] text-white bg-[#840705] p-[0.30rem] text-[1.1rem] xs:max-sm:text-[0.6em] xs:max-sm:w-[3.3rem] xl:max-2xl:text-[0.7rem] xl:max-2xl:p-[0.05rem] xl:max-2xl:w-[4rem] items-center rounded-lg hover:bg-[#5a1513] transition-colors delay-250 duration-[3000] ease-in"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ImageEditModal;
