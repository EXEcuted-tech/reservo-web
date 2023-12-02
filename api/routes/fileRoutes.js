const express = require('express');
const router = express.Router();
const { uploadFile, fetchFile, retrieveByParams } = require('../controllers/fileController');

const upload = require('./multer')

router.post('/upload', upload.single('file'), uploadFile);
router.get('/retrieve', retrieveByParams);
router.get('/fetch', fetchFile);

module.exports = router;