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
    <div className={`modal ${isOpen ? 'block animate-fade-in h-[9rem] w-[40%] pr-[2%]' : 'hidden'}`}>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-container">

        <div className="modal-body pl-4 ">
          <label className="block mb-2">New Image URL:</label>
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-[0.6rem] w-full focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="modal-footer p-3 ml-[57%] ">
          <button 
                type="submit"
                className="btn btn-primary w-[5rem] text-white bg-[#1B6E1E] p-[0.30rem] text-[1.1rem] items-center rounded-lg hover:bg-[#00962a] transition-colors delay-250 duration-[3000] ease-in" 
                onClick={handleSave}>
            Save
          </button>
          <button 
                className="btn btn-secondary w-[6rem] ml-[0.4rem] text-white bg-[#840705] p-[0.30rem] text-[1.1rem] items-center rounded-lg hover:bg-[#5a1513] transition-colors delay-250 duration-[3000] ease-in" 
                onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditModal;
