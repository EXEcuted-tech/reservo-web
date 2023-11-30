const express = require('express');
const db = require('./a_db'); 

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

module.exports = {
    uploadFile
}