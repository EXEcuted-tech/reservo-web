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
                res.status(200).json({
                    success: false,
                    message: "Account add fail",
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Account created successfully",
                });
            }

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database Error",
            error: error.message
        });
    }
}

const login = (req,res)=>{
    try {
        const { account_email, password, account_type} = req.body;

        // Use a parameterized query to prevent SQL injection
        const sql = "SELECT * FROM account WHERE email_address = ?";
        const values = [account_email];
        db.query(sql, values, (err, dbresult) => {
            //console.log("W: " + account_type + " DB: "+dbresult[0].account_type);

            if (!err && dbresult.length === 1){
                if (account_type != dbresult[0].account_type){
                    return res.status(400).json({
                        success: false,
                        message: "Account Type Mismatch",
                    });
                }else{
                    const hash = dbresult[0].passwd;
                    bcrypt.compare(password,hash).then(function(result) {
                        if (result == true){
                            res.status(201).json({
                                success: true,
                                message: "Retrieved",
                                account_info:{
                                    userID: dbresult[0].account_id,
                                    user: dbresult[0].account_name,
                                    email: dbresult[0].account_email,
                                    type: dbresult[0].account_type                           
                                }
                            });
                        }else{
                            res.status(200).json({
                                success: false,
                                message: "Incorrect Credentials",
                            });
                        }
                    });
                }
                    
            }else{
                res.status(200).json({
                    success: false,
                    message: "Bad Request",
                });
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