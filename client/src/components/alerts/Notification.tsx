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
    backgroundImage: `linear-gradient(270deg, ${color}, white, white)`,
  };

    return (
      <span className='z-[100]'>
        {message &&
        <>
      <div
        className={`animate-fade-in fixed top-0 right-0 m-4 p-4 w-[25%] text-center text-white rounded-lg ${
          visible
            ? `transition-opacity duration-300 opacity-100`
            : 'transition-opacity duration-300 opacity-0 pointer-events-none'
        }`}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', backgroundColor: color }}
      >
        {message}
      </div>
      <div className={`animate-slide-left bg-gradient-to-l fixed top-[4%] right-0 rounded-b-lg m-4 w-[25%] h-[5px]
            ${visible}
            ? 'transition-opacity duration-300 opacity-100'
            : 'transition-opacity duration-300 opacity-0 pointer-events-none'
      `} style={divStyle}></div>
      </>}
    </span>
    );
}

export default Notification;