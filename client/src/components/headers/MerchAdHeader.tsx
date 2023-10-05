import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { BiSolidUserCircle } from 'react-icons/bi';

interface MerchAdHeaderProps {
  icon: IconType; // React icon component type
  title: string;
}

const MerchAdHeader: React.FC<MerchAdHeaderProps> = ({ icon: Icon, title }) => {
  const [username,setUsername] = useState("");
  const truncatedUsername = username.slice(0, 12);
  const storedAcc = localStorage.getItem('admerchDetails');

  useEffect(() => {
    if(storedAcc) {
      setUsername(JSON.parse(storedAcc).user);
    }
  }, []);

  return (
    <div className='font-poppins flex items-center w-[100%] h-[5vh] py-[3%]'>
        <div className='flex items-center w-[90%] ml-[2%]'>
            <Icon className='mr-[1%] text-[3em] mt-[0.5%]' /> 
            <h1 className='font-medium text-[2.2em]'>{title}</h1>
        </div>
        <div className='flex items-center w-[15%]'>
            <BiSolidUserCircle className='text-black text-[2.5em] mr-[2%]'/> 
            <p className='text-[1.1em]'>{truncatedUsername}</p>
        </div>
    </div>
  );
};

export default MerchAdHeader;