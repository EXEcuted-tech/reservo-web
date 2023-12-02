import React, {useState} from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import {MdOutlineReviews} from 'react-icons/md'
import MerchantTeams from '../../../components/merchant-review/MerchantTeams'
import MerchantApplications from '../../../components/merchant-review/MerchApplications'

const tabs = ['Merchant Applications','Merchant Teams'];

const MerchantReview = () => {
  const [active, setActive] = useState(false);

  return (
    <div className='bg-[#FFFFFF] h-full font-poppins overflow-y-auto overflow-x-hidden animate-fade-in xs:max-sm:w-full xs:max-sm:overflow-x-hidden'>
      <div className="w-full">
      {/* Header Section */}
      <MerchAdHeader icon={MdOutlineReviews} title="Merchant Manager"/>
      {/* Main Content Area */}
      <div className='bg-[#F3F3F3] h-[90vh] px-[3%] py-[1%]'>
        {/* Navigation Section */}
        <ul className='overflow-hidden text-[1.2em] font-bold'>
          <li className={`${active==false && 'border-[#660605] border-b-4 '} float-left pb-[0.5%] mr-[5%] hover:cursor-pointer hover:translate-y-[-0.1em] transition-all`} 
          onClick={() => setActive(false)}>Merchant Applications</li>
          <li className={`${active==true && 'border-[#660605] border-b-4 '} float-left pb-[0.5%] mr-[5%] hover:cursor-pointer hover:translate-y-[-0.1em] transition-all`}
          onClick={() => setActive(true)}>Merchant Teams</li>
          <hr className='border-black w-full'/>
        </ul>
        {/* Content Section */}
        {active === false ? <MerchantApplications/> : <MerchantTeams/>}
      </div>
    </div>
    </div>
  )
}

export default MerchantReview