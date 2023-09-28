const express = require('express');
const db = require('./index'); 

const createReserve = (req,res)=>{
    res.json({
        success:true,
        data: req.body,
    })
}

const getReserve = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

module.exports = {
    createReserve,
    getReserve,
}