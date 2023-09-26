import React from 'react'
import colors from '../../../common/colors.ts'
import { FaIcons } from 'react-icons/fa'
import { AiFillDownCircle } from "react-icons/ai";
import Card from "../../../components/card/card.tsx";
import CardEmpty from "../../../components/card/CardEmpty.tsx"

const PackageManager = () => {
    return (
<div className={`bg-[#FFFFFF] h-[100vh] w-[85vw] font-poppins overflow-y-auto`}>
    <div className="SortFilterSubheader flex mb-4 text-lg bg-[#f0e5d8]">
        <div className="flex align-middle w-3/6 items-center mx-32 ps-8 h-20">
        <label htmlFor="filterDropdown" className={`font-bold mx-2 w-[4vw]`}>Sort By: </label>
                    <select id="sortDropdown" name="sortDropdown" className={`bg-transparent rounded-md h-10 w-[20vw]  hover:bg-white transition duration-150 ease-out hover:ease-in`}>
                        <option value="option1">A to Z (Alphabetical Ascending)</option>
                        <option value="option2">Popular</option>
                        <option value="option3">Oldest</option>
                    </select>
        </div>
        <div className="flex align-middle w-3/6 items-center mx-48 ps-8 h-20">
            <label htmlFor="filterDropdown" className={`font-bold mx-2`}>Filter By: </label>
                    <select id="filterDropdown" name="filterDropdown" className={`bg-transparent rounded-md h-10 w-[9vw] hover:bg-white transition duration-150 ease-out hover:ease-in`}>
                        <option value="option1">Time-Limited</option>
                        <option value="option2">All Time</option>
                        <option value="option3">Exclusive</option>
                    </select>
                
        </div>
    </div>
    <div className='PublishedPackages ps-20'>
        <p className={`text-3xl mx-20 my-3 font-bold`}>Published Packages</p>
        <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl  ">
            <Card
                packageName='Lechon Kawali'
                description='A lechon kawali served hot 1kg good for four people.'
                price='360.00'
            />

            <Card
                packageName='Lechon Kawali'
                description='A lechon kawali served hot 1kg good for four people.'
                price='360.00'
            />

            <Card
                packageName='Lechon Kawali'
                description='A lechon kawali served hot 1kg good for four people.'
                price='360.00'
            />


        </div>
    </div>

    
    <div className='PublishedPackages ps-20 my-10'>
        <p className={`text-3xl mx-20 my-3 font-bold`}>Unpublished Packages</p>
        <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl  ">
            <CardEmpty/>
            <Card
                packageName='Lechon Kawali'
                description='A lechon kawali served hot 1kg good for four people.'
                price='360.00'
            />

            <Card
                packageName='Lechon Kawali'
                description='A lechon kawali served hot 1kg good for four people.'
                price='360.00'
            />

            <Card
                packageName='Lechon Kawali'
                description='A lechon kawali served hot 1kg good for four people.'
                price='360.00'
            />


        </div>
    </div>
</div>
    )
  }
  
  export default PackageManager