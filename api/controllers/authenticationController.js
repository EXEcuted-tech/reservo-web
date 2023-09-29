const express = require('express');
const db = require('./a_db'); 

const createAccount = async (req, res) => {
    try {
        const { account_name, account_email, password, account_type, contact_number } = req.body;

        // Use a parameterized query to prevent SQL injection
        const sql = "INSERT INTO account (account_name, account_email, passwd, account_type, contact_number) VALUES (?, ?, ?, ?, ?)";
        const values = [account_name, account_email, password, account_type, contact_number];
        db.query(sql, values, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    message: "Account add fail",
                });
            } else {
                res.json({
                    success: true,
                    message: "Account created successfully",
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database Error",
        });
    }
}

const login = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

module.exports = {
    createAccount,
    login,
}