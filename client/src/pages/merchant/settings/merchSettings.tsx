import React, { useState, useEffect } from 'react'
import { BsFillBuildingFill } from "react-icons/bs";
import MerchAdHeader from '../../../components/headers/MerchAdHeader.tsx';
import { Divider } from '@mui/material';
import GeneralSettings from './generalSettings';
import AdvancedSettings from './advancedSettings';

const MerchSettings = () => {
    const [activeTab, setActiveTab] = useState(1);
    
    const handleTabClick = (tabNumber: number) => {
        setActiveTab(tabNumber);
    };

    return (
        <div className={`bg-[#FFFFFF] h-[100vh] font-poppins overflow-y-auto overflow-x-hidden animate-fade-in`}>
        <div className="w-[80vw]">
        <MerchAdHeader icon={BsFillBuildingFill} title={'Merchant Settings'}/>

            <div className="bg-[#F3F3F3] h-full w-full">
 
                <div style={{fontFamily: 'Poppins, sans-serif'}} className="flex ml-10 mr-10 text-xl">
                    <div
                        className={`hover:underline tab-item cursor-pointer p-4 transition duration-300 ease-in-out ${activeTab === 0 ? 'font-bold' : ''}`}
                        onClick={() => handleTabClick(1)}
                    >
                        General Settings
                    </div>
                   
                    <div
                        className={`hover:underline tab-item cursor-pointer p-4 transition duration-300 ease-in-out ${activeTab === 0 ? 'font-bold' : ''}`}
                        onClick={() => handleTabClick(2)}
                    >
                        Advanced
                    </div>
                    <div
                        className={`underline transition-transform duration-300 ease-in-out ${activeTab === 0 ? 'translate-x-0' : activeTab === 1 ? 'translate-x-full' : 'translate-x-full*2'}`}
                    ></div>
                </div>

                <Divider />
                {activeTab === 1 && <GeneralSettings />}
                {activeTab === 2 && <AdvancedSettings />}
            </div>
            </div>
        </div>  
    )
}



export default MerchSettings