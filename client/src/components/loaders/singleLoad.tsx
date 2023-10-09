import React from 'react';

function SingleCard({props1,props2}:{props1:string,props2:string}) {
    return (
        <div className={`w-full float-left ${props1 && props1}`}>
            <div role="status" className="w-full rounded animate-pulse">
                <div className="w-full">
                    <div className={`${props2 ? props2 : 'h-[100px]'} bg-gray-300 rounded-lg dark:bg-gray-600 w-full mb-[20px]`}></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default SingleCard;