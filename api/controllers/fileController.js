const express = require('express');
const db = require('./a_db'); 
const path = require('path');
const fs = require('fs');

const uploadFile = (req, res) => {
    const { filename } = req.file;
    const filePath = req.file.path;
  
    const sql = 'INSERT INTO files (filename, path) VALUES (?, ?)';
    db.query(sql, [filename, filePath], (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        res.status(500).json({ message: 'Error uploading file' });
      } else {
        res.status(200).json({ 
            success:  true,
            message: 'File uploaded successfully',
            data: result,
        });
      }
    });
  };

const fetchFile = (req, res) => {
  const { pathfile } = req.query;
  console.log("REQ: ", req.query);
  const filePath = decodeURIComponent(pathfile).replace(/\\/g, '/');
  console.log("Decoded: ", filePath);

  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
};
  
const retrieveByParams = (req,res)=>{
  const { col, val } = req.query;

  db.query('SELECT * FROM files WHERE ?? = ?', [col, val], (error, result) => {
      if(error){
          res.status(500).json({error: 'Error retrieving data'})
      }
      else{
          return res.status(200).json({
              status: 200,
              success: true,
              filedata: result[0],
          })
      }
  })
}

module.exports = {
    uploadFile,
    retrieveByParams,
    fetchFile,
}