const express = require('express');
const db = require('./a_db'); 

const createInventory = (req,res)=>{
    console.log("DATABSE: ",db);
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
      const {inventoryID} = req.params
      const inventoryUpdate = req.body

      const cols = Object.keys(inventoryUpdate)
      const values = Object.values(inventoryUpdate)

      const setClause = cols.map((col) => `${col} = ?`).join(', ')

      const sql = `UPDATE inventory SET ${setClause} WHERE inventory_id = ?`

      db.query(sql,[inventoryUpdate,userID],(err,results) => {
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
            success: false,
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
              console.log("Error fetching data")
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
        const {col, value} = req.body
        const sql = "SELECT * FROM inventory WHERE ?? = ?"
        db.query(sql,[col, value], (err, results) => {
            if(err){
                console.log("Error fetching data")
                res.status(500).json({error: 'Internal server error'})
            }else{
                res.status(200).json({
                    status: 200,
                    success: true,
                    users: results
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

module.exports = {
    createInventory,
    updateInventory,
    retrieveAll,
    retrieveByParams,
    deleteInventory,
}