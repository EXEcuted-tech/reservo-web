import colors from '../../common/colors'
import React from 'react'
import {AiFillCloseCircle, AiFillDelete} from "react-icons/ai"
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../assets/css/card.css"
import { IoAddCircleSharp } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useState, useEffect} from 'react'

interface CreatePackageModal{
    onClose: ()=>void;
}

  const CreatePackageModal: React.FC<CreatePackageModal>=({onClose}) => {

    const [isCreatePackageModalOpen, setIsCreatePackageModalOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
      // This effect will run whenever `items` changes
      console.log(items);
    }, [items]); 
    
    const closeCreatePackageModal = () => {
        setIsCreatePackageModalOpen(false);
        onClose();
      };

    const addItem = () => {
    if (itemName.trim() !== '') {
        setItems((prevItems)=> [...prevItems, itemName]);
        setItemName('');
    }
    };



    return (
    <div className=''>
    <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] backdrop-blur-sm animate-zoom-in'>
    <div className='flex justify-center align-center my-20'>
        <div className="w-[75vw] h-[80vh] bg-white p-10 rounded-xl">
            <div className='grid grid-cols-2 h-[5vh] border-b-2 border-black'> {/*this is the header for the modal*/}
                <div className='flex start items-center'><p><b>Add a new Package</b></p></div>
                <div className='flex justify-end'><button className='flex items-center text-3xl ' onClick={closeCreatePackageModal}><AiFillCloseCircle className='mx-2 detailsClose'/></button></div>
            </div>
            <div className="grid grid-cols-2 h-[60vh] my-5 border-b-2 border-solid border-[#000000]">
            <div>
            <div className='h-[40vh]'>
                <p><b>Package Name: </b><input type="text" className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Total Price: </b> <input type="text" className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Available From: </b> <input type="date" className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Expiry Date: </b> <input type="date" className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input></p>
                <p><b>Tags: </b> <input type="text" placeholder="Separate by commas (,)" className="h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4"></input>
                
                </p>
                <p><b>Visibility: </b>
                        <select id="sortDropdown" name="sortDropdown" className={`h-[4vh] my-2 border-solid border-[#000000] border-2 rounded-md mx-4`}>
                        <option value="Visible">Visible</option>
                        <option value="Hidden">Hidden</option>
                    </select>
                    </p>
                <p><b>Description: </b></p>
                <textarea placeholder="Your Description Here" className="w-[80%] h-[25%] overflow-y-auto my-4 border-solid border-[#000000] border-2 rounded-md mx-4"></textarea>
            </div>
            
            </div>
            <div>
            <div className='IMAGE_PLACEHOLDER bg-slate-600 block w-3/5 h-3/5 rounded-2xl'></div>
            <label htmlFor="packageImage">Upload Image Here: </label>
            <input className="my-2" type="file" name="packageImage" accept="image/png, image/gif, image/jpeg" />
            <div className="my-2">
        
          <b>Items: </b>
          <div className='overflow-y-auto h-[8vh]'>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        <div className='flex flex-row item'>
        <button
            onClick={addItem}
            className="w-[5vw] h-[4vh] rounded-md bg-[#7dc72d] flex items-center justify-center">
            <IoMdAddCircleOutline/>Add Item
          </button><input
            type="text"
            placeholder="Separate by commas (,)"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="h-[4vh] border-solid border-[#000000] border-2 rounded-md mx-4">
          </input>
          </div>
          
        
      </div>
            </div>
            

            </div>
            <div className='flex justify-end items-center h-[5vh]'>{/*This is the footer*/}
                <button className='w-[5vw] h-[4vh] mx-5 rounded-md bg-[#e14f4c] flex items-center justify-center' onClick={onClose}><AiFillDelete/>Cancel</button>
                <button className='w-[5vw] h-[4vh] bg-[#7dc72d] mx-5 rounded-md flex items-center justify-center'><IoAddCircleSharp/>Add</button>

            </div>
        </div>

    </div>
    </div>
    </div>
  )
}

export default CreatePackageModal