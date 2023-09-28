import React from 'react'
import colors from '../../../common/colors'
import MerchCard from './merchCard'

const ChoicePage = () => {

  const merchantsData: MerchCardProps[] = [
    {
      merchId: 1,
      picture: 'https://i.imgur.com/ht36TyH.jpg',
      businessName: "Derf's Grill and Restaurant",
      rating: 4,
      reviewCount: 2002,
      location: 'Maasin City, Leyte, Philippines',
      description: 'Yummy, delicious food! Catering to all! Yummy, delicious food! Catering to all!',
      priceRange: '₱ 500 - ₱ 10,000',
      tags: ['Catering', 'On-Site','Off-Site' ]
    },
    {
      merchId: 2,
      picture: 'https://i.imgur.com/AZOtzD7.jpg',
      businessName: "J & J Lechon Belly House",
      rating: 3,
      reviewCount: 152,
      location: 'Talamban, Cebu, Philippines',
      description: 'Wow! Lechon belly house!',
      priceRange: '₱ 500 - ₱ 10,000',
      tags: ['Catering', 'On-Site','Off-Site' ]
    },
    {
      merchId: 3,
      picture: 'https://i.imgur.com/AZOtzD7.jpg',
      businessName: "J & J Lechon Belly House",
      rating: 3,
      reviewCount: 152,
      location: 'Talamban, Cebu, Philippines',
      description: 'Wow! Lechon belly house!',
      priceRange: '₱ 500 - ₱ 10,000',
      tags: ['Catering', 'On-Site','Off-Site' ]
    },
  ];
  
  return (
    <div className={`animate-slide-left font-poppins bg-[#F9F2EA] h-[80vh]`}>
        <div className='text-center text-[#DD2803]'>
          <h1 className='text-[2em] pt-[0.2%] font-bold'>Browse. Select. Reserve.</h1>
          <p className='text-[1.2em] pb-[0.2%] '>Choose and book for your favorite occasion!</p>
        </div>
        
        <div className='flex bg-white h-[75vh] rounded-t-[4rem]'>
          {/* 1st Row of white container */}
          <div className='w-[100%]'>
            <div className='text-center mt-[1.5%]'>
              <input type='text' 
                     className='w-[95%] h-[5vh] bg-[#EDEDED] pl-[1%] text-[1.2em] rounded-2xl' 
                     placeholder="🔍 Search Restaurant or Food Business"
                     />
            </div>
            <div className='flex justify-between w-[100%] mt-[0.8%] mb-[1.2%]'>
              <div className='w-[50%] ml-[3%] text-[#969696]'>
                Showing
                <input
                  type='text'
                  defaultValue={2}
                  className='w-[2%] text-center border mx-[0.4%] border-slate-400'
                />
                out of {"5"} businesses
              </div>
              <div className='mr-[4%]'>
                <select className='border border-slate-300 rounded-2xl px-[3%] text-[#969696]'>
                  <option value='option1'>Sort by A-Z</option>
                  <option value='option2'>Sort by Z-A</option>
                </select>
              </div>
            </div>

            {/* List of Merchants */}
            <div className='overflow-y-scroll h-[57vh] z-10'>
              {merchantsData.map((merchant, index) => (
                <div className='px-[2%]'>
                  <MerchCard key={index} {...merchant} />
                  <hr className='pb-[1%]'/>
                </div>
              ))}
            </div>
          </div>


          
        </div>        
    </div>
  )
}

export default ChoicePage