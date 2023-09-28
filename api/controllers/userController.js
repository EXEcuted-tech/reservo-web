const express = require('express');
const db = require('./index'); 

const signUp = (req,res)=>{
    res.json({
        success:true,
        data: req.body,
    })
}

const authenticate = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

module.exports = {
    signUp,
    authenticate,
}