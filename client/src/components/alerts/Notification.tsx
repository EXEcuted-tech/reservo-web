import React, { useEffect, useState } from 'react';

function Notification({message, color}:{message:string, color:string}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // Adjust the duration as needed (5 seconds in this example)

    return () => {
      clearTimeout(timer);
    };
  }, []);
    return (
      <span>
      <div
        className={`animate-fade-in fixed top-0 right-0 m-4 p-4 bg-[${color}] w-[25%] text-center text-white rounded-lg ${
          visible
            ? `transition-opacity duration-300 opacity-100`
            : 'transition-opacity duration-300 opacity-0 pointer-events-none'
        }`}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
      >
        {message}
      </div>
    </span>
    );
}

export default Notification;