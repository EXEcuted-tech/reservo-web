const express = require('express');
const db = require('../index'); 

const createReserve = (req,res)=>{
    const {} = req.body;
    res.json({
        success:true,
        data: req.body,
    })
}

const updateReserve = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

const retrieveAll = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

const retrieveByParams = (req,res)=>{
    res.json({
        success:true,
        data:[{id:1,text:'Testing Purposes Only'}]
    })
}

const deleteReserve = (req,res)=>{

}

module.exports = {
    createReserve,
    updateReserve,
    retrieveAll,
    retrieveByParams,
    deleteReserve,
}