const express = require('express');
const router = express.Router();
const authenticationValidator = require('../validations/authenticationValidator');
const {createAccount,login} = require('../controllers/authenticationController')

router.post('/signup',authenticationValidator,createAccount);
router.post('/login',login);

module.exports = router;