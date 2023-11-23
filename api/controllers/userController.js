const express = require('express');
const db = require('./a_db');
const saltRounds = 10;
const bcrypt = require('bcrypt'); 

const updateUser = async (req,res)=>{
    try {
        const {userID} = req.query
        const userUpdate = req.body

        const cols = Object.keys(userUpdate)
        const values = Object.values(userUpdate);

        if (userUpdate.passwd) {
          const hashedpassword = await bcrypt.hash(userUpdate.passwd, saltRounds);
          const passwdIndex = cols.indexOf("passwd");
    
          if (passwdIndex !== -1) {
            values[passwdIndex] = hashedpassword;
          }
        }

      const setClause = cols.map((col) => `${col} = ?`).join(', ')

      const sql = `UPDATE account SET ${setClause} WHERE account_id = ?`

        db.query(sql,[...values,userID],(err,results) =>{
            if(err){
                console.error('Error Getting data:', err)
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: "Account udpate unsuccessful",
                    error: err.message
                })
            } else{
                res.status(200).json({
                    status: 200,
                    success: true,
                    message: "Successfully updated account",
                    data: results
                })
            }
        })        
    } catch (error) {
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
        const sql = "SELECT * FROM account";
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
        const sql = "SELECT * FROM account WHERE ?? = ?"
        db.query(sql,[col, val], (err, results) => {
            if(err){

                res.status(201).json({error: 'Account does not exist'})
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

const retrieveCountByParams = (req, res) => {
    const { col, val } = req.query;
  
    const retrieveSpecific = 'SELECT COUNT(*) AS record_count FROM account WHERE ?? = ?';
  
    db.query(retrieveSpecific, [col, val], (err, row) => {
        if (err) {
            console.error('Error retrieving records:', err);
            return res.status(500).json({ status: 500, success: false, error: 'Error retrieving records' });
        } else {
            const recordCount = row[0].record_count;
  
            return res.status(200).json({
                status: 200,
                success: true,
                acctCount: recordCount,
            });
        }
    });
  };

  const retrieveCountByAccountType = (req, res) => {
    const { year } = req.query

    const retrieveAccountCount = 'SELECT YEAR(date_signedup) AS signup_year , MONTH(date_signedup) AS signup_month, SUM(CASE WHEN account_type = 1 THEN 1 ELSE 0 END) AS count_user, SUM(CASE WHEN account_type = 10 THEN 1 ELSE 0 END) AS count_merchant FROM account WHERE YEAR(date_signedup) = ? AND account_status = "active" GROUP BY MONTH(date_signedup);'

    db.query(retrieveAccountCount, [year], (err, accounts) => {
        if (err) {
            console.error('Error retrieving accounts:', err);
            return res.status(500).json({ 
                status: 500, 
                success: false, 
                error: 'Error retrieving accounts' 
            });
        } else {
            const accountCount = accounts;
  
            return res.status(200).json({
                status: 200,
                success: true,
                acctCount: accountCount,
            });
        }
    })
}

const deleteRecord = (req, res) => {
    try {
        const { user_id } = req.query;
        const sql = 'DELETE FROM account WHERE account_id = ?';
        console.log("USER_ID: ",user_id);
        db.query(sql, [user_id], (err, results) => {
            if (err) {
                console.error('Error deleting record:', err);
                res.status(200).json({
                    status: 500,
                    success: false,
                    message: 'Error deleting record',
                    error: err.message,
                });
            } else {
                if (results.affectedRows === 0) {
                    res.status(200).json({
                        status: 404,
                        success: false,
                        message: 'Record not found',
                    });
                } else {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Record deleted successfully',
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Database Error',
            error: error.message,
        });
    }
};
module.exports = {
    updateUser,
    retrieveAll,
    retrieveByParams,
    retrieveCountByParams,
    retrieveCountByAccountType,
    deleteRecord
}