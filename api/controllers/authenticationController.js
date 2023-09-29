const express = require('express');
const db = require('../index'); 
const bcrypt = require("bcrypt") //Imported bcryp package

const users = []

const createAccount = async (req,res)=>{
    try{
        const hashPassword = await bcrypt.hash(req.body.password,10)
        users.push({
            account_name: req.body.text.username,
            email_address: req.body.text.email,
            passwd: hashPassword,
            contact_number: req.body.text.contactnumber,
            account_status: 'active'
        })
        res.redirect("/login")
    }catch (e){
        console.log(e)
        res.redirect("/signup")
    }

    // res.json({
    //     success:true,
    //     data: req.body,
    // })
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