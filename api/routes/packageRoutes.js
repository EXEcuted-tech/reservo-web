const express=require('express');
const router = express.Router();
const createPackageValidator=require('../validations/packageValidator')
const {createPackage,updatePackage,retrieveAll,retrieveByParams,deletePackage} = require('../controllers/packageController')

router.post('/create',createPackageValidator,createPackage);
router.put('/update',createPackageValidator,updatePackage);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.delete('/delete',deletePackage);

module.exports = router;
