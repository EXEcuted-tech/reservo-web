import React, {useState} from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import {MdOutlineReviews} from 'react-icons/md'
import MerchantApplications from '../../../components/merchant-review/MerchApplications'
import MerchantTeams from '../../../components/merchant-review/MerchantTeams'
const tabs = ['Merchant Applications','Merchant Teams'];

const MerchantReview = () => {
  const [active, setActive] = useState(false);

  return (
    <div className='w-[100%] font-poppins overflow-hidden'>
      {/* Header Section */}
      <MerchAdHeader icon={MdOutlineReviews} title="Merchant Manager"/>
      {/* Main Content Area */}
      <div className='bg-[#F3F3F3] h-[90vh] px-[3%] py-[1%]'>
        {/* Navigation Section */}
        <ul className='overflow-hidden pb-[0.5%] border-black border-b-2 text-[1.2em] font-bold'>
          <li className='float-left border-[#660605] border-b-4 mr-[5%] hover:cursor-pointer hover:translate-y-[-0.1em] transition-all' onClick={() => setActive(false)}>Merchant Applications</li>
          <li className='hover:cursor-pointer hover:translate-y-[-0.1em] transition-all' onClick={() => setActive(true)}>Merchant Teams</li>
        </ul>
        {/* Content Section */}
        {active === false ? <MerchantApplications/> : <MerchantTeams/>}
      </div>
    </div>
  )
}

export default MerchantReview