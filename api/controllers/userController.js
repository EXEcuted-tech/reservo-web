const express = require('express');
const db = require('./a_db'); 

const updateUser = (req,res)=>{
    try {
        const {userID} = req.params
        const userUpdate = req.body
        const sql = "UPDATE account SET ? WHERE account_id = ?"

        db.query(sql,[userUpdate,userID],(err,results) =>{
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
                    success: false,
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
        const {col, val} = req.query;
        const sql = "SELECT * FROM account WHERE ?? = ?";

        db.query(sql,[col, val], (err, results) => {
            if(err){
                console.log("Error fetching data", err);
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

module.exports = {
    updateUser,
    retrieveAll,
    retrieveByParams,
}