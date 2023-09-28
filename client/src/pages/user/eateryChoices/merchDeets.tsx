import React from 'react'
import Card from '../../../components/card/card'
import Rating from '@mui/material/Rating';
import {GrLocation} from 'react-icons/gr'
import {AiOutlineFolderView, AiFillStar, AiOutlineArrowLeft} from 'react-icons/ai'
import {BsBookFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import CommentSec from './commentSec';
import { Transition } from '@headlessui/react'


/*Insertan panig back end para ma fully functional*/

const MerchDeets = () => {
    const navigate = useNavigate();
    const data=   {
        merchId: 1,
        picture: 'https://i.imgur.com/ht36TyH.jpg',
        businessName: "Derf's Grill and Restaurant",
        rating: 4,
        reviewCount: 2002,
        location: 'Maasin City, Leyte, Philippines',
        description: 'Yummy, delicious food! Catering to all! Yummy, delicious food! Catering to all!',
        priceRange: '₱ 500 - ₱ 10,000',
        tags: ['Catering', 'On-Site','Off-Site' ]
    }

    const reviewData: ReviewProps[] = [
        {
          reviewId: 1,
          customerName: "Kathea Mari Mayol",
          rating: 5,
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            reviewId: 2,
            customerName: "John Doe",
            rating: 4,
            comment: "Amazeballs!"
        },
        {
            reviewId: 3,
            customerName: "Minatozaki Sana",
            rating: 2.5,
            comment: "Amazeballs!"
        },
        {
            reviewId: 3,
            customerName: "Minatozaki Sana",
            rating: 2.5,
            comment: "Amazeballs!"
        },
      ];

  const navigateBack = () =>{
    
  }

  return (
    <div className={`animate-slide-right font-poppins bg-[#F9F2EA] h-[100%]`}>
       <div className='text-[#DD2803] ml-[2%]'>
         <h1 className='text-[2.5em] py-[1%] font-bold flex items-center'>
            <AiOutlineArrowLeft className='text-black mr-[1%] hover:text-[#DD2803]'
            onClick={()=>{navigate('/eaterychoice')}}/>
            Merchant Details
        </h1>
       </div>

       <div className='bg-white h-[100%]'>

          {/* 1st Row of white container */}
          <div className='flex w-[100%] h-[30vh]'>
            <div className='mt-[2%] ml-[3%]'>
                <img className='w-[262px] h-[219px] rounded-[50px]' src={data.picture}/>
            </div>

            <div className='ml-[2%] mt-[2.5%] w-[80vw]'>
                <h1 className='font-bold text-[2em]'>{data.businessName}</h1>
                <div className='flex'>
                {/* Left Side */}
                    <div>
                        <div className='flex mt-[0.5%]'>
                            <Rating value={data.rating} readOnly />
                            <p className='ml-[1%]'>({data.reviewCount} Reviews)</p>
                        </div>
                        <div className='flex items-center mt-[1%] text-[1.1em]'>
                            <GrLocation className='text-[1.3em] mr-[0.5%]'/>
                            {data.location}
                        </div>
                        <div className='w-[50vw]'>
                            <p className='mt-[1%] text-[1.1em]'><span className='font-bold mr-[0.5%]'>Description:</span>{data.description}</p>
                        </div>
                        <div className='w-[30vw]'>
                        <p className='mt-[2%] text-[1.1em]'>
                            <span className='font-bold mr-[0.5%]'>Tags:</span>
                            {data.tags.map((tag:string, index:number) => (
                                <span key={index} 
                                 className='rounded-3xl bg-[#D9EFFF] border border-[#06F] text-[#06F] ml-[0.5%] mr-[1.5%]
                                            text-[1em] py-[0.5%] px-[1%]'>
                                    {tag}
                                </span>
                            ))}
                        </p>
                    </div>
                    </div>

                    <div className='flex flex-col relative justify-start mt-[-2.5%] mr-[2%] ml-[22%] w-[100%]'>
                        <button className='w-[100%] flex items-center justify-center text-black bg-[#F4D147] mb-[4%] px-[3%] 
                            py-[4%] rounded-3xl hover:bg-[#FFB800] font-medium text-[1.3em]'
                            onClick={()=>{navigate('/eaterychoice/book')}}>
                            <BsBookFill className='text-center text-[1em] mr-[2%]'/>Book Now
                        </button>
                        <button className='w-[100%] flex items-center justify-center text-white bg-[#FF8A00] px-[3%] py-[4%] rounded-3xl
                            hover:bg-[#FFD8AA] hover:text-black font-medium text-[1.3em]'>
                            <AiFillStar className='text-[1.5em]'/>Rate Here
                        </button>
                    </div>
                </div>
            </div>
          </div>

          <hr className='h-[10px] mx-[3%]'/>
          {/* 2nd Row of white container */}
          <div className='ml-[3%]'>
            <h1 className='text-[2em] font-bold'>MENU AND PACKAGES</h1>
            <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Price Range:</span>{data.priceRange}</p>
            <div className='PublishedPackages mt-[-2%]'>
            <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl">
                <Card
                    packageID='10379'
                    packageName='Lechon Kawali'
                    description='A lechon kawali served hot 1kg good for four people.'
                    price='360.00'
                    tags={["Best-Seller", "Popular"]}
                    visibility='Visible'
                    items={["Lechon 1KG"]}
                    oneButton={true}
                />

                <Card
                    packageID='10379'
                    packageName='Lechon Kawali'
                    description='A lechon kawali served hot 1kg good for four people.'
                    price='360.00'
                    tags={["Best-Seller", "Popular"]}
                    visibility='Visible'
                    items={[]}
                    oneButton={true}
                />

                <Card
                    packageID='10289'
                    packageName='Combo Meal'
                    description='A bang for the buck meal'
                    price = '190.00'
                    tags={["Best-Seller", "Popular"]}
                    visibility='Visible'
                    items={["1pc Rice, 1pc Chicken, 16oz Drink"]}
                    oneButton={true}
                />


            </div> 
            </div>
          </div>

           {/* 3rd Row of white container */}
           <hr className='h-[10px] mx-[3%] mt-[1%]'/>
           <div className='ml-[3%]'>
                <h1 className='text-[2em] font-bold'>CUSTOMER REVIEWS</h1>
                <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Average Rating:</span>4.5</p>
                <p className='text-[1.1em]'><span className='font-bold mr-[0.5%]'>Total Reviews:</span>5,021 Total</p>
                {reviewData.map((review,index)=>(
                    <div className='my-[1%]'>
                        <CommentSec key={index} {...review}/>
                    </div>
                ))}
           </div>   
        </div>        


       
    </div>
  )
}

export default MerchDeets