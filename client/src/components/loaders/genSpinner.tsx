import React from 'react'

const GenSpinner = () => {
  return (
    <div>
        <div className="flex">
            <div className="relative">
                <div className="w-12 h-12 rounded-full absolute
            border-4 border-solid border-gray-200"></div>

                <div className="w-12 h-12 rounded-full animate-spin absolute
            border-4 border-solid border-[#DD2803] border-t-transparent"></div>
            </div>
        </div>
    </div>
  )
}

export default GenSpinner