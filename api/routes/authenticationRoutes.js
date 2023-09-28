const express=require('express');
const router = express.Router();
const authenticateValidator = require('../validations/authenticationValidator');
const {createAccount,login} = require('../controllers/authenticationController')

router.post('/signup',authenticateValidator,createAccount);
router.post('/login',login);

module.exports = router;
