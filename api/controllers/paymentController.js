const express = require('express');
const db = require('./a_db'); 

const createPayment = (req,res)=>{
    const {pack_name,pack_desc,date_start,date_end,time_start,time_end,visibility,list,imgUrl,tags,merch_id} = req.body;
    
    const insert = 
    'INSERT INTO package (package_name,package_desc,date_start,date_end,time_start,time_end,visiblity,item_list,image_filepath,tags,merchant_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

    const data = [pack_name,pack_desc,date_start,date_end,time_start,time_end,visibility,list,imgUrl,tags,merch_id]
    db.query(insert, data, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error inserting data' });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          data: result,
        });
      } else {
        return res.status(500).json({ status: 500, success: false, error: 'Record insertion failed' });
      }
    });
}

const updatePayment = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

const retrieveAll = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

const retrieveByParams = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

const deletePayment = (req,res)=>{

}

module.exports = {
    createPayment,
    updatePayment,
    retrieveAll,
    retrieveByParams,
    deletePayment,
}