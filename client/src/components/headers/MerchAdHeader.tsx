import React from 'react';
import { IconType } from 'react-icons/lib';
import { BiSolidUserCircle } from 'react-icons/bi';

interface MerchAdHeaderProps {
  icon: IconType; // React icon component type
  title: string;
}

const MerchAdHeader: React.FC<MerchAdHeaderProps> = ({ icon: Icon, title }) => {
  return (
    <div className='font-poppins flex items-center w-[100%] h-[5vh] py-[3%]'>
        <div className='flex items-center w-[85%] ml-[2%]'>
            <Icon className='mr-[1%] text-[3em] mt-[0.5%]' /> 
            <h1 className='font-medium text-[2.2em]'>{title}</h1>
        </div>
        <div className='flex items-center w-[15%]'>
            <BiSolidUserCircle className='text-black text-[2.5em] mr-[2%]'/> 
            <p className='text-[1.1em]'>Kathea Mari</p>
        </div>
    </div>
  );
};

export default MerchAdHeader;