import React, { useState, useEffect } from 'react'
import { BsFillBuildingFill } from "react-icons/bs";
import MerchAdHeader from '../../../components/headers/MerchAdHeader.tsx';
import GeneralSettings from './generalSettings';
import AdvancedSettings from './advancedSettings';
import ToggleHeader from '../../../components/headers/toggleHeader.tsx';

const MerchSettings = () => {

return (
        
    <div className={`bg-[#FFFFFF] h-full font-poppins overflow-y-auto overflow-x-hidden animate-fade-in xs:max-sm:w-full xs:max-sm:overflow-x-auto`}>
        <div className="w-full">
        <MerchAdHeader icon={BsFillBuildingFill} title={'Merchant Settings'}/>

            <div className="bg-[#F3F3F3] h-[175vh] xs:max-sm:w-full xl:max-2xl:h-[245vh]">
             <div className="flex ml-10 mr-10 text-xl xs:max-sm:ml-[-1rem] xs:max-sm:mr-14">
                <ToggleHeader
                title1="General Settings"
                title2="Advanced Settings"
                component1={<GeneralSettings />}
                component2={<AdvancedSettings />}
                />
                </div>
            </div>  
        </div>
    </div>
    )
}

export default MerchSettings