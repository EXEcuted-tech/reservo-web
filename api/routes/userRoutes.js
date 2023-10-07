const express=require('express');
const router = express.Router();
const authenticateValidator =require('../validations/authenticationValidator')
const {updateUser,retrieveAll,retrieveByParams,retrieveCountByParams}=require('../controllers/userController')

router.post('/edit',updateUser);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.get('/retrieve_count',retrieveCountByParams);

module.exports = router;
