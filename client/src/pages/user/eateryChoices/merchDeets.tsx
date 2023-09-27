import React from 'react'
import Card from '../../../components/card/card'


const MerchDeets = () => {
  return (
    <div>
       <div className='PublishedPackages ps-20'>
        <p className={`text-3xl mx-20 my-3 font-bold`}>Menu</p>
        <div className="PackageGallery flex flex-row  overflow-x-scroll overflow-y-hidden h-[60vh] mx-20 p-8 rounded-xl  ">
            <Card
                packageID='10379'
                packageName='Lechon Kawali'
                description='A lechon kawali served hot 1kg good for four people.'
                price='360.00'
                tags={["Best-Seller", "Popular"]}
                visibility='Visible'
                items={["Lechon 1KG"]}
            />

            <Card
                packageID='10379'
                packageName='Lechon Kawali'
                description='A lechon kawali served hot 1kg good for four people.'
                price='360.00'
                tags={["Best-Seller", "Popular"]}
                visibility='Visible'
                items={[]}
            />

            <Card
                packageID='10289'
                packageName='Combo Meal'
                description='A bang for the buck meal'
                price = '190.00'
                tags={["Best-Seller", "Popular"]}
                visibility='Visible'
                items={["1pc Rice, 1pc Chicken, 16oz Drink"]}
            />


        </div> 
        </div>
    </div>
  )
}

export default MerchDeets