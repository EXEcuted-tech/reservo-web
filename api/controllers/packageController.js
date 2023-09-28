const express = require('express');
const db = require('./index'); 

const createPackage = (req,res)=>{
    res.json({
        success:true,
        data: req.body,
    })
}

const updatePackage = (req,res)=>{
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

const deletePackage = (req,res)=>{

}

module.exports = {
    createPackage,
    updatePackage,
    retrieveAll,
    retrieveByParams,
    deletePackage,
}