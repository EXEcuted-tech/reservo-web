import React, { useState } from 'react'
import colors from '../../common/colors'
import { FaIcons } from 'react-icons/fa'
import { AiFillDownCircle } from "react-icons/ai";
import { HiOutlineMagnifyingGlass, HiMiniPencilSquare } from "react-icons/hi2";
import "../../assets/css/card.css"
import DetailsModal from '../modals/package-modal/DetailsModal';
import EditDetailsModal from '../modals/package-modal/EditDetailsModal';



interface prop {
    key: string;
    package_id: string;
    packageName: string;
    date_start: Date;
    date_end: Date;
    time_start: string;
    time_end:string;
    price: string;
    description: string;
    tags: string[];
    visibility: string;
    items: string[];
    filePath: string;
    oneButton: boolean;
}

const Card: React.FC<prop>=({package_id,  packageName, price, date_start, date_end, description, tags, visibility, time_start, time_end, items,filePath, oneButton}) => {
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
        <div className='Card mx-5 my-5 min-w-[18vw] max-w-[18vw] min-h-[50vh] max-h-[50vh] truncate xs:max-sm:min-w-[60vw] xs:max-sm:max-w-[60vw] xs:max-sm:min-h-[30vh] xl:max-2xl:min-h-[55vh]'>
            <div className="">
                <div className='CardImage flex flex-col h-[100%]'><img
                    src={filePath} // Use your image URL from the DB here
                    alt="Package Image"
                    onError={(e) => {
                      e.currentTarget.onerror = null; // Prevent infinite loop if the image itself is not found
                      e.currentTarget.src = 'https://i.imgur.com/YNoZzmJ.png'; // Use a placeholder image as a fallback
                    }}
                    className="w-full h-full object-cover rounded-2xl"/></div>
                <p className="text-xl my-1 text-center font-bold flex flex-col xl:max-2xl:text-lg">{packageName}</p>
                <div className='text-l mx-8 h-[15vh] indent-5 break-words xl:max-2xl:text-[0.8em] xs:max-sm:h-[10vh]'>
                  {description}
                </div>

              <div className='flex h-5 justify-center my-2 items-center xs:max-sm:mt-[-3%] xs:max-sm:my-0'>
                <p className="text-xl my-5 text-center font-bold xs:max-sm:text-lg xl:max-2xl:text-lg">PHP {price}</p>
              </div>

              <div className="mx-10 flex space-x-5 items-center xs:max-sm:mt-[5%]">
                  <button className='CardButton flex DetailsButton text-[1.1rem] w-1/2 items-center justify-center xs:max-sm:text-[1em] xl:max-2xl:text-[0.7em]' 
                    onClick={openModal}><HiOutlineMagnifyingGlass className="mr-[3%]"/>Details</button>
                  {isModalOpen && <DetailsModal onClose={closeModal} packageID={package_id} packageName={packageName} date_start={date_start} date_end={date_end} price={price} description={description} tags={tags} visibility={visibility} items={items} time_start={time_start} time_end={time_end} filePath={filePath} openEditModal={function (): void {
                  throw new Error('Function not implemented.');
                } }/>}
                  {oneButton === false &&
                    <button className='CardButton flex EditButton text-[1.1rem] w-1/2 items-center justify-center xs:max-sm:text-[1em] xl:max-2xl:text-[0.7em]' 
                      onClick={openEditModal} ><HiMiniPencilSquare className="mr-[3%]"/>Edit</button>
                  }
                  {isEditModalOpen && <EditDetailsModal  onClose={closeEditModal} dateStart={date_start} timeStart={time_start} timeEnd={time_end} dateEnd={date_end} packageID={package_id} packageName={packageName} price={price} description={description} tags={tags} visibility={visibility} items={items} filePath={filePath}/>}
                </div>
            </div>
        </div>
    )
}

export default Card