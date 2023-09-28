const express = require('express');
const db = require('./index'); 

const createAccount = (req,res)=>{
    res.json({
        success:true,
        data: req.body,
    })
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