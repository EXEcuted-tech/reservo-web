const express = require('express');
const db = require('./a_db'); 

const createInventory = (req,res)=>{
    console.log("DATABSE: ",db);
    const {test} = req.body;
 
      const insertQuery = 'INSERT INTO test (test) VALUES (?)';

      db.query(insertQuery, [test], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ success: false, error: 'Error inserting data' });
        }
    
        if (result.affectedRows > 0) {
          // Data insertion successful
          return res.status(201).json({
            success: true,
            data: result,
          });
        } else {
          return res.status(500).json({ success: false, error: 'Data insertion failed' });
        }
      });
}

const updateInventory = (req,res)=>{
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

const deleteInventory = (req,res)=>{

}

module.exports = {
    createInventory,
    updateInventory,
    retrieveAll,
    retrieveByParams,
    deleteInventory,
}