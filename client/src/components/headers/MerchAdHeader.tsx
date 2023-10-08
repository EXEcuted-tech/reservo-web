<<<<<<< HEAD
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
  const [shortLet,setShortLet] = useState("");

  useEffect(() => {
    if(storedAcc) {
      setUsername(JSON.parse(storedAcc).user);
    }

    if(username){
      getShortLetter(username);
    }
  }, [username]);

  const getShortLetter = (name:string) => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      setShortLet(nameParts[0].charAt(0).toUpperCase());
    } else if (nameParts.length > 1) {
      setShortLet(nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase());
    }
  };

  return (
    <div className='font-poppins flex items-center w-[100%] h-[5vh] py-[3%]'>
        <div className='flex items-center w-[90%] ml-[2%]'>
            <Icon className='mr-[1%] text-[3em] mt-[0.5%]' /> 
            <h1 className='font-medium text-[2.2em]'>{title}</h1>
        </div>
        <div className='flex items-center w-[15%]'>
          {username 
            ?
              <div className="relative inline-flex items-center justify-center w-10 mr-[2%] h-10 overflow-hidden bg-[#840705] rounded-full dark:bg-gray-600">
                  <span className="font-medium text-white dark:text-gray-300">{shortLet}</span>
              </div>
            :
              <BiSolidUserCircle className='text-black text-[2.5em] mr-[2%]'/> 
            }      
            <p className='text-[1.1em]'>{truncatedUsername}</p>
        </div>
    </div>
  );
};

=======
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

>>>>>>> 802eb6c58c81e931b06842bdf6bd99922a31a6dd
export default MerchAdHeader;