const express=require('express');
const router = express.Router();
const signUpValidator =require('../validations/userValidator')
const {signUp,authenticate}=require('../controllers/userController')

router.post('/signup',signUpValidator,signUp);
router.post('/login',signUpValidator,authenticate);
router.get('/retrieve',authenticate);
router.get('/retrieveByParams',authenticate);

module.exports = router;
