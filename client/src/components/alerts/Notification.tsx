import React, { useEffect, useState } from 'react';

function Notification({message, color}:{message:string, color:string}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log("NOTIFIED!",message);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); 

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const divStyle = {
    backgroundImage: `linear-gradient(-270deg, ${color}, white)`,
  };

    return (
      <div className='z-[100000]'>
      <span className=''>
        {message &&
        <>
      <div
        className={`animate-fade-in fixed top-0 right-0 m-4 p-4 w-[25%] text-center text-white rounded-lg xs:max-sm:bg-opacity-60 xs:max-sm:top-10 xs:max-sm:w-[90%] xs:max-sm:text-[0.8em] xl:max-2xl:text-[0.8em] ${
          visible
            ? `transition-opacity duration-300 opacity-100`
            : 'transition-opacity duration-300 opacity-0 pointer-events-none'
        }`}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', backgroundColor: color }}
      >
        {message}
      </div>
      <div className={`animate-slide-left fixed top-[6%] right-0 rounded-b-lg m-4 w-[25%] h-[5px] xl:max-2xl:top-[9.3%] xs:max-sm:w-[40%] xs:max-sm:top-[10%] xs:max-sm:right-[10%]
            ${visible}
            ? 'opacity-100 '
            : ' opacity-0'
      `} style={divStyle}></div>
      </>}
    </span>
    </div>
    );
}

export default Notification;