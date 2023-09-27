import React, { useEffect } from 'react'
import Rating from '@mui/material/Rating';
import {GrLocation} from 'react-icons/gr'
import {AiOutlineFolderView} from 'react-icons/ai'
import {BsBookFill} from 'react-icons/bs'

const MerchCard: React.FC<MerchCardProps> = (props) => {

    useEffect(() => {
        console.log("PROPS: ",props);
      }, []); 

  return (
    <div className='flex h-[25vh]'>
        <div>
            <img className='w-[262px] h-[219px] rounded-[50px]' src={props.picture}/>
        </div>

        <div className='ml-[3%] w-[80vw]'>
            <h1 className='font-bold text-[2em]'>{props.businessName}</h1>
            <div className='flex'>
            {/* Left Side */}
                <div>
                    <div className='flex'>
                        <Rating value={props.rating} readOnly />
                        <p className='ml-[1%]'>({props.reviewCount} Reviews)</p>
                    </div>
                    <div className='flex items-center mt-[1%] text-[1.1em]'>
                        <GrLocation className='text-[1.3em] mr-[0.5%]'/>
                        {props.location}
                    </div>
                    <div className='w-[30vw]'>
                        <p className='mt-[1.5%] text-[1.1em]'><span className='font-bold mr-[0.5%]'>Description:</span>{props.description}</p>
                    </div>
                </div>

                {/* Right Side */}
                <div className=''>
                    <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Price Range:</span>{props.priceRange}</p>
                    <div className='w-[30vw]'>
                        <p className='mt-[1.5%] text-[1.1em]'>
                            <span className='font-bold mr-[0.5%]'>Tags:</span>
                            {props.tags.map((tag:string, index:number) => (
                                <span key={index} 
                                 className='rounded-3xl bg-[#D9EFFF] border border-[#06F] text-[#06F] mr-[0.5%]
                                            text-[0.8em] py-[0.5%] px-[1%]'>
                                    {tag}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
                <div className='flex justify-end mt-[9%] mr-[2%] w-[100%]'>
                    <button className='flex items-center text-white bg-[#FF8A00] mr-[5%] px-[3%] py-[1.5%] rounded-2xl
                        hover:bg-[#FFD8AA] hover:text-black font-medium'>
                        <AiOutlineFolderView className='text-[1.6em]'/>View More
                    </button>
                    <button className='w-[35%] flex items-center text-black bg-[#F4D147] px-[3%] py-[1.5%] rounded-2xl
                        hover:bg-[#FFB800] font-medium'>
                        <BsBookFill className='text-[1em] mr-[2%]'/>Book Now
                    </button>
                </div>
            </div>
        </div>


    </div>
  )
}

export default MerchCard