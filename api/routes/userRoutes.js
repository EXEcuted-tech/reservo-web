const express=require('express');
const router = express.Router();
const authenticateValidator =require('../validations/authenticationValidator')
const {updateUser,retrieveAll,retrieveByParams}=require('../controllers/userController')

router.post('/edit',authenticateValidator,updateUser);
router.post('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);

module.exports = router;
