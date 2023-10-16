import React, { useState } from 'react';

interface ToggleHeaderProps {
  title1: string;
  title2: string;
  component1: React.ReactNode; 
  component2: React.ReactNode;
}

const ToggleHeader: React.FC<ToggleHeaderProps> = ({ title1, title2, component1, component2 }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="w-full">    
      <div className="h-[10vh] p-8">
        <div style={{ fontFamily: 'Poppins, sans-serif' }} className="flex text-[1.2em] font-medium pt-2">
          <div
            onClick={() => handleTabClick(1)}
            style={{ cursor: 'pointer' }}
            className={`  ${activeTab === 1 ? 'font-bold border-b-[3px] pb-3 border-[#840705]' : 'hover:text-[#840705] transition-colors delay-450 duration-[3000] ease-in-out'}`}
          >
            {title1}
          </div>
          <div
            onClick={() => handleTabClick(2)}
            style={{ cursor: 'pointer' }}
            className={` ml-7 ${activeTab === 2 ? 'font-bold border-b-[3px] pb-3 border-[#840705]' : 'hover:text-[#840705] transition-colors delay-450 duration-[3000] ease-in-out'}`}
          >
            {title2}
          </div>
        </div>
        <nav className="flex gap-8 border-b-2 border-black"> </nav>
        {activeTab === 1 && component1}
        {activeTab === 2 && component2} 

      </div>
    </div>
  );
};

export default ToggleHeader;