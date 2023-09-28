const express = require('express');
const db = require('./a_db'); 
const saltRounds = 10;
const bcrypt = require('bcrypt');

const createAccount = async (req, res) => {
    try {
        const { account_name, account_email, password, account_type, contact_number } = req.body;

        // Use a parameterized query to prevent SQL injection
        const sql = "INSERT INTO account (account_name, email_address, passwd, account_type, contact_number) VALUES (?, ?, ?, ?, ?)";
        const hashedpassword = await bcrypt.hash(password, saltRounds)
        const values = [account_name, account_email, hashedpassword, account_type, contact_number];
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

            db.end();
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database Error",
        });
    }
}

const login = (req,res)=>{
    try {
        const { account_email, password} = req.body;

        // Use a parameterized query to prevent SQL injection
        const sql = "SELECT email_address, passwd FROM account WHERE email_address = ?";
        const values = [account_email];
        db.query(sql, values, (err, result) => {
            if (!err && result.length === 1){
                const hash = result[0].passwd;
            bcrypt.compare(password,hash).then(function(result) {
                if (result == true){
                    res.json({
                        success: true,
                        message: "Retrieved",
                    });
                }else{
                    res.json({
                        success: false,
                        message: "Incorrect Credentials",
                    });
                }
            });
                
                db.end();
        }else{
            console.log(err);
        }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database Error",
        });
    }
    
    
}

module.exports = {
    createAccount,
    login,
}