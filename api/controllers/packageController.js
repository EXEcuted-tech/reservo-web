const express = require('express');
const db = require('./a_db'); 
const { forEach } = require('../validations/packageValidator');

const createPackage = (req,res)=>{
  refreshDeadline()

    const {
      package_name,
      package_desc,
      price,
      date_start,
      date_end,
      time_start,
      time_end,
      visibility,
      item_list,
      image_filepath,
      tags,
      merchant_id
    } = req.body;
    
    const insert = 'INSERT INTO package (package_name,package_desc,price,date_start,date_end,time_start,time_end,visibility,item_list,image_filepath,tags,merchant_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    const data = [package_name,package_desc,price,date_start,date_end,time_start,time_end,visibility,item_list,image_filepath,tags,merchant_id]
    db.query(insert, data, (err, result) => {
      
      if (err) {
        
        return res.status(500).json({ status: 500, success:false,error: 'Error inserting data' });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          data: result.affectedRows,
        });
      } else {
        return res.status(500).json({ status: 500, success: false, error: 'Record insertion failed' });
      }
    });
}

const updatePackage = (req, res) => {
  refreshDeadline
  const inputData = req.body; // Use the JSON object directly
  console.log("INPUT BEH==>", inputData);

  // Construct the SET clause for the SQL update statement
  const setClauses = Object.keys(inputData)
    .filter(key => key !== 'package_id') // Exclude package_id from the update
    .map(key => `${key} = ?`)
    .join(', ');

  // Create the data array by mapping values from the JSON object
  const data = Object.keys(inputData)
    .filter(key => key !== 'package_id') // Exclude package_id from the data
    .map(key => inputData[key]);

  // Add the package_id to the end of the data array
  data.push(inputData.package_id);

  const update = `UPDATE package SET ${setClauses} WHERE package_id = ?`;

  db.query(update, data, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).json({ status: 500, success: false, error: 'Error updating data' });
    }

    if (result.affectedRows > 0) {
      console.log(result)
      return res.status(200).json({
        status: 200,
        success: true,
        data: result,
      });
    } else {
      return res.status(500).json({ status: 500, success: false, error: 'Record update failed' });
    }
  });
};

const localUpdatePackage = (req) => {
  const inputData = req.body; // Use the JSON object directly
  console.log("INPUT BEH==>", inputData);

  // Construct the SET clause for the SQL update statement
  const setClauses = Object.keys(inputData)
    .filter(key => key !== 'package_id') // Exclude package_id from the update
    .map(key => `${key} = ?`)
    .join(', ');

  // Create the data array by mapping values from the JSON object
  const data = Object.keys(inputData)
    .filter(key => key !== 'package_id') // Exclude package_id from the data
    .map(key => inputData[key]);

  // Add the package_id to the end of the data array
  data.push(inputData.package_id);

  const update = `UPDATE package SET ${setClauses} WHERE package_id = ?`;

  db.query(update, data, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return JSON.stringify({ status: 500, success: false, error: 'Error updating data' });
    }

    if (result.affectedRows > 0) {
      console.log(result)
      return JSON.stringify({
        status: 200,
        success: true,
        data: result,
      });
    } else {
      return JSON.stringify({ status: 500, success: false, error: 'Record update failed' });
    }
  });
};

const refreshDeadline = () => {
  db.query('SELECT * FROM package', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Failed to get data!" })
    } else {
      rows.forEach(element => {
        var dateNow = new Date();

        // Check date_end and time_end for setting visibility to NOT PUBLISHED
        if (element.visibility !== 'DELETED'){
        if (element.date_end && dateNow >= element.date_end) {
          if (element.visibility === "PUBLISHED") {
            var body = { ...element, visibility: "NOT PUBLISHED" };
            var req = { body };
            localUpdatePackage(req);
            console.log("Updated Package: ", element.package_name, " to NOT PUBLISHED");
          }
        } else {
          // Check time_end for setting visibility to NOT PUBLISHED
          if (element.time_end) {
            var timeNow = new Date().toLocaleTimeString('en-US', { hour12: false });
            if (timeNow > element.time_end && element.visibility === "PUBLISHED") {
              var body = { ...element, visibility: "NOT PUBLISHED" };
              var req = { body };
              localUpdatePackage(req);
              console.log("Updated Package: ", element.package_name, " to NOT PUBLISHED");
            } else {
              console.log("Package", element.package_name, "is Active");
            }
            
          } else {
            console.log("Package", element.package_name, "is Active");
          }
        }

          // Check date_start and time_start for setting visibility to PUBLISHED
          if (element.date_start && dateNow >= element.date_start && element.time_start) {
            var timeNow = new Date().toLocaleTimeString('en-US', { hour12: false });
            if (timeNow >= element.time_start && element.visibility === "NOT PUBLISHED") {
              var body = { ...element, visibility: "PUBLISHED" };
              var req = { body };
              localUpdatePackage(req);
              console.log("Updated Package: ", element.package_name, " to PUBLISHED");
            }
          }
        }
      });
    }
  });
}


const retrieveAll = (req,res)=>{
  refreshDeadline()
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
  refreshDeadline()
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

const retrieveByTwoParams = (req,res)=>{
  refreshDeadline()
  const { col1, val1, col2, val2, order_param} = req.query; 
  var orderByClause = ''; // Initialize the ORDER BY clause

  if (order_param) {
    // If an order_param is provided, add the ORDER BY clause
    orderByClause = ` ORDER BY ${order_param} ASC`; // You can change ASC to DESC if needed
  }

  const retrieveSpecific = `SELECT * FROM package WHERE ?? = ? AND ?? = ?${orderByClause}`;

  db.query(retrieveSpecific, [col1,val1, col2, val2],(err, rows)  =>  {
    if (err) {
      console.error('Error retrieving records:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        data: rows,
      });
      
    }
  });
}

const deletePackage = (req,res)=>{
  const{ package_id } = req.body
  refreshDeadline()

    const deleteQuery = `UPDATE package SET visibility='DELETED' WHERE package_id = ?`;
    db.query(deleteQuery, package_id,(err, result) => {
      if (err) {
        console.error('Error deleting record:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error deleting records', message: 'Failed to delete.' });
      }else{
        
        return res.status(200).json({
          status: 200,
          success: true,
          message: 'Deleted Package Successfully!',
          data: result,
        });
      }
    });
}

const retrieveMinMaxPrices = (req, res) => {
  refreshDeadline()
  const {merch_id} = req.query;

  const retrieveMinPriceQuery = `SELECT MIN(price) AS min_price FROM package WHERE merchant_id = ?`;
  const retrieveMaxPriceQuery = `SELECT MAX(price) AS max_price FROM package WHERE merchant_id = ?`;

 db.query(retrieveMinPriceQuery, [merch_id], (minPriceErr, minPriceRows) => {
      if (minPriceErr) {
          return res.status(500).json({ status: 500, success: false, error: 'Error retrieving min price' });
      } else {
          const minPrice = minPriceRows[0].min_price;

          db.query(retrieveMaxPriceQuery, [merch_id], (maxPriceErr, maxPriceRows) => {
              if (maxPriceErr) {
                  return res.status(500).json({ status: 500, success: false, error: 'Error retrieving max price' });
              } else {
                  const maxPrice = maxPriceRows[0].max_price;

                  return res.json({
                      status: 200,
                      success: true,
                      minPrice: minPrice,
                      maxPrice: maxPrice,
                  });
              }
          });
      }
  });
};

module.exports = {
    createPackage,
    updatePackage,
    retrieveAll,
    retrieveByParams,
    deletePackage,
    retrieveByTwoParams,
    retrieveMinMaxPrices,
    refreshDeadline,
}