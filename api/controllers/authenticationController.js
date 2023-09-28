const express = require('express');
const db = require('./a_db'); 

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