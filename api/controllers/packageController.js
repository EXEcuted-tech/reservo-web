const express = require('express');
const db = require('./a_db'); 

const createPackage = (req,res)=>{
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

const updatePackage = (req,res)=>{
    const {pack_name,pack_desc,date_start,date_end,time_start,time_end,visibility,list,imgUrl,tags,merch_id} = req.body;
    
    const update = 
    'UPDATE package SET package_name=?,package_desc=?,date_start=?,date_end=?,time_start=?,time_end=?,visibility=?,item_list=?,image_filepath=?,tags=? WHERE package_id=?';

    const data = [pack_name,pack_desc,date_start,date_end,time_start,time_end,visibility,list,imgUrl,tags,merch_id]
    db.query(update, data, (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error updating data' });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          data: result,
        });
      } else {
        return res.status(500).json({ status: 500, success: false, error: 'Record update failed' });
      }
    });
}

const retrieveAll = (req,res)=>{
    const retrieveRecs = 'SELECT * FROM package'

    db.query(retrieveRecs, (err, rows) => {
      if (err) {
        console.error('Error retrieving all records:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
      }else{
        return res.status(200).json({
          status: 200,
          success: true,
          data: rows,
        });
      }
    });
}

const retrieveByParams = (req,res)=>{
    const { col, val } = req.query; 

    const retrieveSpecific = 'SELECT * FROM package WHERE ?? = ?';
  
    db.query(retrieveSpecific, [col,val],(err, row) => {
      if (err) {
        console.error('Error retrieving records:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving records' });
      }else{
        return res.status(200).json({
          status: 200,
          success: true,
          data: row,
        });
      }
    });
}

const deletePackage = (req,res)=>{
    const {pack_id} = req.body;

    const deleteQuery = 'DELETE FROM package WHERE package_id = ?';
  
    db.query(deleteQuery, pack_id,(err, result) => {
      if (err) {
        console.error('Error deleting record:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error deleting records' });
      }else{
        return res.status(200).json({
          status: 200,
          success: true,
          data: result,
        });
      }
    });
}

module.exports = {
    createPackage,
    updatePackage,
    retrieveAll,
    retrieveByParams,
    deletePackage,
}