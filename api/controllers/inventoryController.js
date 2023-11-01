const express = require('express');
const db = require('./a_db'); 

const createInventory = (req,res)=>{
    const {numTables, numChairs, numPlates, numGlasses, numTableCloth, numChairCovers} = req.body;
 
      const insertQuery = 'INSERT INTO inventory (no_of_tables, no_of_chairs, no_of_plates, no_of_glasses, no_of_tableCloths, no_of_chairCovers) VALUES (?,?,?,?,?,?)';

      db.query(insertQuery, [numTables, numChairs, numPlates, numGlasses, numTableCloth, numChairCovers], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ 
            success: false, 
            error: err.message
          });
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
    try{
      const { inventoryID } = req.query;
      const {no_of_tables,no_of_chairs,no_of_plates,no_of_glasses,no_of_tableCloths,no_of_chairCovers} = req.body;
  
      const sql = `UPDATE inventory SET no_of_tables=?,no_of_chairs=?,no_of_plates=?,no_of_glasses=?,
                   no_of_tableCloths=?,no_of_chairCovers=? WHERE inventory_id = ?`;
      
      const values=[no_of_tables,no_of_chairs,no_of_plates,no_of_glasses,no_of_tableCloths,no_of_chairCovers,inventoryID];
 
      db.query(sql, values, (err, results) => {

        if(err){
          console.error('Error Getting data:', err)
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: "Account udpate unsuccessful",
                    error: err.message
                })
        }else{
          res.status(200).json({
            status: 200,
            success: true,
            message: "Successfully updated inventory",
            data: results
        })
        }
      })

    }catch(error){
      res.status(500).json({
        status: 500,
        success: false,
        message: "Database Error",
        error: error.message
    });
    }
}

const retrieveAll = (req,res)=>{
  try {
          const sql = "SELECT * FROM inventory";
          db.query(sql, (err, results) => {
          if(err){

              res.status(500).json({error: 'Internal server error'})
          }else{
              res.json({
                  success: true,
                  user: results,
              })
          }
        })
      } catch (error) {
      res.status(500).json({
          status: 500,
          success: false,
          message: "Database Error",
      });
    }
}

const retrieveByParams = (req,res)=>{
  try {
        const {col, val} = req.query
        const sql = "SELECT * FROM inventory WHERE ?? = ?"
        db.query(sql,[col, val], (err, results) => {
            if(err){

                res.status(500).json({error: 'Internal server error'})
            }else{
                res.status(200).json({
                    status: 200,
                    success: true,
                    records: results
                })
            }
        })
      }catch(error){
          res.status(500).json({
              status: 500,
              success: false,
              message: "Database Error",
          });
      }
}

const deleteInventory = (req,res)=>{
  try{
    const {inventoryID} = req.body
    const sql = "DELETE FROM inventory WHERE inventory_id = ?"

    db.query(sql,inventoryID,(error,result) =>{
      if(error){
        console.error('Error deleting data:', error)
        res.status(500).json({
          status: 500,
          success: fail,
          error: 'Error deleteng data'
        })
      }else{
        res.status(200).json({
          status: 200,
          succes: true,
          inventory: result
        })
      }
    })
  }catch(error){
    res.status(500).json({
        status: 500,
        success: false,
        message: "Database Error",
    });
  }
}

const retrieveCountByParams = (req, res) => {
  const { col, val } = req.query;

  const retrieveSpecific = 'SELECT COUNT(*) AS record_count FROM inventory WHERE ?? = ?';

  db.query(retrieveSpecific, [col, val], (err, row) => {
      if (err) {
          console.error('Error retrieving records:', err);
          return res.status(500).json({ status: 500, success: false, error: 'Error retrieving records' });
      } else {
          const recordCount = row[0].record_count;

          return res.status(200).json({
              status: 200,
              success: true,
              inventoryCount: recordCount,
          });
      }
  });
};

module.exports = {
    createInventory,
    updateInventory,
    retrieveAll,
    retrieveByParams,
    deleteInventory,
    retrieveCountByParams
}