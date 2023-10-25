const express=require('express');
const router = express.Router();
const {sendEmail,validateOTP}=require('../controllers/forgetPasswordController')

router.post('/sendEmail',sendEmail);
router.post('/verifycode',validateOTP);


module.exports = router;
