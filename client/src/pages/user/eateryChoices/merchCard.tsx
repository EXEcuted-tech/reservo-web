import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import {GrLocation} from 'react-icons/gr'
import {AiOutlineFolderView} from 'react-icons/ai'
import {BsBookFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import config from '../../../common/config';
import axios from 'axios';

const MerchCard: React.FC<MerchCardProps> = (props) => {

  const navigate = useNavigate();
  const [concAddress,setConcAddress] = useState("");
  const [minPrice,setMinPrice] = useState(0);
  const [maxPrice,setMaxPrice] = useState(0);
  const [ratingCount,setRatingCount] = useState(0);
  const [avg,setAvg] = useState(0);
  //get const here nga makaget sa userDetails para itan.aw if naay userDetails ni exist

  useEffect(() => {
    sessionStorage.removeItem('merch_idtoView');
    sessionStorage.removeItem('merch_idtoBook');
    const address = (
        (props.address?.barangay ? `${props.address.barangay}, ` : '') +
        (props.address?.municipality ? `${props.address.municipality}, ` : '') +
        (props.address?.province ? `${props.address.province}, ` : '') +
        (props.address?.country ? props.address.country : '')
    );
    setConcAddress(address);
    retrievePriceRange();
    retrieveRatingCount();
    retrieveRatingAvg();
  }, []); 

  const retrievePriceRange = () =>{
    const merchId = props.merchant_id;
    axios.get(`${config.API}/package/retrieve_price?merch_id=${merchId}`)
    .then((res)=>{
       if(res.data.success === true){
        setMinPrice(res.data.minPrice);
        setMaxPrice(res.data.maxPrice);
       }
    }).catch((err)=>{

    })
  }

  const retrieveRatingCount = () =>{
    const col = "merchant_id" 
    const val = props.merchant_id;
    axios.get(`${config.API}/feedback/retrieve_count?col=${col}&val=${val}`)
    .then((res)=>{
       if(res.data.success === true){
        setRatingCount(res.data.ratingCount)
       }
    })
  }

  const retrieveRatingAvg = () =>{
    const merchId = props.merchant_id;
    axios.get(`${config.API}/feedback/retrieve_avg?merch_id=${merchId}`)
    .then((res)=>{
       if(res.data.success === true){
        setAvg(res.data.average);
       }
    })
  }


  return (
    <div className='flex h-[25vh] xs:max-sm:h-[33vh] xs:max-sm:mb-[2%] xl:max-2xl:mb-[2%]'>
        <div>
            <img className='w-[262px] h-[219px] rounded-[50px] xs:max-sm:w-[300px] xs:max-sm:h-[100px] xs:max-sm:mt-[5%] xl:max-2xl:w-[182px] xl:max-2xl:h-[150px]' src={props.logo || ''}/>
        </div>

        <div className='ml-[3%] w-[80vw] xs:max-sm:w-[68vw]'>
            <h1 className='font-bold text-[2em] xs:max-sm:text-[1.4em] xl:max-2xl:text-[1.4em]'>{props.merchant_name}</h1>
            <div className='flex'>
                {/* Left Side */}
                <div>
                    <div className='flex'>
                        <Rating value={avg} className="xs:max-sm:scale-75 xs:max-sm:ml-[-10%] xs:max-sm:mr-[-8%] xl:max-2xl:scale-75 xl:max-2xl:ml-[-4%]" readOnly />
                        <p className='ml-[1%] xs:max-sm:text-[0.8em] xs:max-sm:pt-1 xs:max-2xl:sm-[-2%] xl:max-2xl:text-[0.8em] xl:max-2xl:pt-1 xl:max-2xl:ml-[-2%]'>({ratingCount} Reviews)</p>
                    </div>
                    <div className='flex items-center mt-[1%] text-[1.1em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
                        <GrLocation className='text-[1.3em] mr-[0.5%] xs:max-sm:mt-[-10%] xl:max-2xl:text-[1em]'/>
                        {concAddress !== '' ? concAddress : "Coming Soon"}
                    </div>
                    <div className='flex w-[30vw] pr-[8%] xs:max-sm:w-[45vw]'>
                        <p className='mt-[1.5%] text-[1.1em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'><span className='font-bold mr-[0.5%]'>Description:</span>
                            {props.settings ? props.settings?.description : "Coming Soon!"}</p>
                    </div>
                </div>

                {/* Right Side */}
                <div className=''>
                    <p className='text-[1.1em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'><span className='font-bold mr-[0.5%]'>Price Range:</span>
                        <br className='hidden xs:max-sm:block'></br>
                            {"₱"+minPrice+" - "+"₱"+maxPrice}</p>
                    <div className='w-[30vw] xs:max-sm:w-[24.8vw]'>
                        <p className='mt-[1.5%] text-[1.1em] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em]'>
                            <span className='font-bold mr-[0.5%]'>Tags:</span>
                            {props.settings?.tags.map((tag:string, index:number) => (
                                <span key={index} 
                                 className='rounded-3xl bg-[#D9EFFF] border border-[#06F] text-[#06F] mr-[0.5%]
                                            text-[0.8em] py-[0.5%] px-[1%] xs:max-sm:mx-[1%] xs:max-sm:break-inside-avoid-column xl:max-2xl:mx-[1%]'>
                                    {tag}
                                    <br className='hidden xs:max-sm:block'></br>
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
                {/* For PC Responsiveness */}
                <div className='flex justify-end mt-[9%] mr-[2%] w-[100%] xs:max-sm:hidden xl:max-2xl:mt-[7%]'>
                    <button className='flex items-center text-white bg-[#FF8A00] mr-[2%] px-[3%] py-[1.5%] rounded-2xl xl:max-2xl:mr-[5%]
                        hover:bg-[#FFD8AA] hover:text-black font-medium transition-colors delay-450 duration-[3000] ease-in-out xl:max-2xl:text-[0.7em] xl:max-2xl:h-[2.5rem]'
                        onClick={()=>{
                            navigate('/eaterychoice/view')
                            sessionStorage.setItem('merch_idtoView', props.merchant_id.toString());
                        }}>
                        <AiOutlineFolderView className='text-[1.6em] mt-[-0.1rem]'/>View More
                    </button>
                    <button className='w-[40%] flex items-center text-black bg-[#F4D147] px-[5%] py-[1.5%] rounded-2xl
                        hover:bg-[#FFB800] font-medium transition-colors delay-450 duration-[3000] ease-in-out xl:max-2xl:text-[0.7em] xl:max-2xl:h-[2.5rem] xl:max-2xl:w-[6rem] xl:max-2xl:px-[6%]'
                        onClick={()=>{
                            navigate('/eaterychoice/book')
                            sessionStorage.setItem('merch_idtoBook', props.merchant_id.toString());
                        }}>
                        <BsBookFill className='text-[1em] mr-[2%]'/>Book Now
                    </button>
                </div>
            </div>
            {/* For Mobile Responsiveness */}
            <div className='flex mt-[3%] w-[100%] invisible xs:max-sm:visible xs:max-sm:mt-[7%]'>
                    <button className='flex items-center text-white bg-[#FF8A00] px-[3%] py-[1.5%] rounded-2xl xl:max-2xl:mr-[5%]
                        hover:bg-[#FFD8AA] hover:text-black font-medium transition-colors delay-450 duration-[3000] ease-in-out mr-[2%]'
                        onClick={()=>{
                            navigate('/eaterychoice/view')
                            sessionStorage.setItem('merch_idtoView', props.merchant_id.toString());
                        }}>
                        <AiOutlineFolderView className='text-[1.6em] mt-[-0.1rem]'/>View More
                    </button>
                    <button className='w-[15vh] flex items-center text-black bg-[#F4D147] px-[5%] py-[1.5%] rounded-2xl
                        hover:bg-[#FFB800] font-medium transition-colors delay-450 duration-[3000] ease-in-out'
                        onClick={()=>{
                            navigate('/eaterychoice/book')
                            sessionStorage.setItem('merch_idtoBook', props.merchant_id.toString());
                        }}>
                        <BsBookFill className='text-[1em] mr-[2%]'/>Book Now
                    </button>
                </div>
        </div>
    </div>
  )
}

export default MerchCard