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
    setNewImageUrl('');
  };

  return (
    <div className={`modal ${isOpen ? 'block animate-fade-in h-[7rem] w-[40%] ml-[2%] ' : 'hidden'}`}>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-container">

        <div className="modal-body pl-4 ">
          <label className="block mb-2 text-lg xl:max-2xl:text-[0.65em]">New Image URL:</label>
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-[0.6rem] w-full xl:max-2xl:text-[0.6em] xl:max-2xl:mb-[0.4rem] xl:max-2xl:h-[20%] focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="modal-footer mt-[2%] ml-[63%] xl:max-2xl:ml-[55%]">
          <button 
                type="submit"
                className="btn btn-primary w-[5rem] text-white bg-[#1B6E1E] p-[0.30rem] text-[1.1rem] xl:max-2xl:text-[0.7rem] xl:max-2xl:p-[0.05rem] xl:max-2xl:w-[4rem] items-center rounded-lg hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in" 
                onClick={handleSave}>
            Save
          </button>
          <button 
                className="btn btn-secondary w-[6rem] ml-[0.4rem] text-white bg-[#840705] p-[0.30rem] text-[1.1rem] xl:max-2xl:text-[0.7rem] xl:max-2xl:p-[0.05rem] xl:max-2xl:w-[4rem] items-center rounded-lg hover:bg-[#5a1513] transition-colors delay-250 duration-[3000] ease-in" 
                onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditModal;
