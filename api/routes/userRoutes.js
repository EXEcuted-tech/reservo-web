const express=require('express');
const router = express.Router();
const signUpValidator =require('../validations/accountValidator')
const {signUp,authenticate}=require('../controllers/accountController')

router.post('/signup',signUpValidator,signUp);
router.post('/login',signUpValidator,authenticate);
router.get('/retrieve',authenticate);
router.get('/retrieveByParams',authenticate);

module.exports = router;
