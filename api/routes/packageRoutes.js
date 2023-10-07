const express=require('express');
const router = express.Router();
const [createPackageValidator, updatePackageValidator]=require('../validations/packageValidator')
const {createPackage,updatePackage,retrieveAll,retrieveByTwoParams, retrieveByParams,deletePackage,retrieveMinMaxPrices} = require('../controllers/packageController')

router.post('/create',createPackageValidator,createPackage);
router.post('/update',updatePackageValidator,updatePackage);
router.get('/retrieve',retrieveByParams);
router.get('/retrieveparams',retrieveByTwoParams);
router.get('/retrieve_all',retrieveAll);
router.get('/retrieve_price',retrieveMinMaxPrices);
router.post('/delete',deletePackage);

module.exports = router;
