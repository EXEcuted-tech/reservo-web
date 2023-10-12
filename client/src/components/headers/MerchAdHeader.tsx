import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { BiSolidUserCircle } from 'react-icons/bi';
import config from '../../common/config';
import axios from 'axios';

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
    console.log("STORED ACC: ",storedAcc);
    if(storedAcc) {
      setUsername(JSON.parse(storedAcc).user);
    }

    if(username){
      getShortLetter(username);
    }
  }, [username]);

  useEffect(()=>{
    getMerchantID();
  },[])

  const getShortLetter = (name:string) => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      setShortLet(nameParts[0].charAt(0).toUpperCase());
    } else if (nameParts.length > 1) {
      setShortLet(nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase());
    }
  };

  const getMerchantID = () =>{
    let userID:number;
    if(storedAcc!==null){
     userID = JSON.parse(storedAcc).userID;
    }
    axios.get(`${config.API}/merchant/retrieve_all`)
    .then((res)=>{
      if(res.data.success==true){
        const merchants = res.data.merchant;

        for (const merchant of merchants) {
          const accounts = JSON.parse(merchant.accounts);
          
          if (accounts.hasOwnProperty(userID.toString())) {
            const merchantID = merchant.merchant_id;
            console.log(`User with userID ${userID} is associated with merchant ID ${merchantID}`);
            localStorage.setItem('merch_id', JSON.stringify(merchantID));
            break; 
          }
        }
      }
    })
  }

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

export default MerchAdHeader;