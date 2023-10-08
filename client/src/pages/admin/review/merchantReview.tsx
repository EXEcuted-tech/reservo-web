<<<<<<< HEAD
import React, {useState} from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import {MdOutlineReviews} from 'react-icons/md'
import MerchantApplications from '../../../components/merchant-review/MerchApplications'
import MerchantTeams from '../../../components/merchant-review/MerchantTeams'

const tabs = ['Merchant Applications','Merchant Teams'];

const MerchantReview = () => {
  const [active, setActive] = useState(0);

  return (
    <div className='w-[100%] font-poppins overflow-hidden'>
      {/* Header Section */}
      <MerchAdHeader icon={MdOutlineReviews} title="Merchant Manager"/>
      {/* Main Content Area */}
      <div className='bg-[#F3F3F3] h-[90vh] px-[3%] py-[1%]'>
        {/* Navigation Section */}
        <ul className='overflow-hidden pb-[0.5%] border-black border-b-2 text-[1.2em] font-bold'>
          <li className='float-left border-[#660605] border-b-4 mr-[5%] hover:cursor-pointer hover:translate-y-[-0.1em] transition-all' onClick={() => setActive(0)}>Merchant Applications</li>
          <li className='hover:cursor-pointer hover:translate-y-[-0.1em] transition-all' onClick={() => setActive(1)}>Merchant Teams</li>
        </ul>
        {/* Content Section */}
        {active === 0 ? <MerchantApplications/> : <MerchantTeams/>}
      </div>
    </div>
  )
}

=======
import React from 'react'

const MerchantReview = () => {
  return (
    <div>merchantReview</div>
  )
}

>>>>>>> 802eb6c58c81e931b06842bdf6bd99922a31a6dd
export default MerchantReview