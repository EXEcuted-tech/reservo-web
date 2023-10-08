const express=require('express');
const router = express.Router();
const {sendEmail}=require('../controllers/sendemailController')

router.post('/sendEmail',sendEmail);


module.exports = router;
