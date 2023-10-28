import React, {useState} from 'react'
import MerchAdHeader from '../../../components/headers/MerchAdHeader'
import {MdOutlineReviews} from 'react-icons/md'
import MerchApplications from '../../../components/merchant-review/MerchApplications'
import MerchantTeams from '../../../components/merchant-review/MerchantTeams'
import ToggleHeader from '../../../components/headers/toggleHeader.tsx';

const tabs = ['Merchant Applications','Merchant Teams'];

const MerchantReview = () => {
  const [active, setActive] = useState(0);

  return (
    <div className='bg-[#FFFFFF] h-full font-poppins overflow-y-auto overflow-x-hidden animate-fade-in xs:max-sm:w-full xs:max-sm:overflow-x-auto'>
      <div className="w-full">
      {/* Header Section */}
      <MerchAdHeader icon={MdOutlineReviews} title="Merchant Manager"/>
        {/* Main Content Area */}
        <div className='bg-[#F3F3F3] h-[110vh] px-[3%] py-[1%] xs:max-sm:w-[120%] xl:max-2xl:h-[115vh]'>
          {/* Navigation Section */}
            <div className="flex ml-[-0.6rem] mr-10 text-xl xs:max-sm:ml-[-1rem] xs:max-sm:mr-14">
                <ToggleHeader
                  title1="Merchant Applications"
                  title2="Merchant Teams"
                  component1={<MerchApplications />}
                  component2={<MerchantTeams />}
                />
              </div>
        </div>
      </div>
    </div>
  )
}

export default MerchantReview