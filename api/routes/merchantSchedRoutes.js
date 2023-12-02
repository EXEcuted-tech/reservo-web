const express=require('express');
const router = express.Router();
const  { retrieveAll, createSchedule, updateSchedule, retrieveByParams, retrieveByTwoParams, deleteSchedByID, deleteSchedByParams } = require('../controllers/merchantSchedController');
const [ createSchedValidator, retrieveParamsValidator, retrieveTwoParamsValidator, deleteParamsValidator ] = require('../validations/merchantSchedValidator')

router.get('/retrieve_sched',retrieveAll);
router.post('/create_sched', createSchedValidator, createSchedule);
router.post('/update_sched', createSchedValidator, updateSchedule);
router.get('/retrieve', retrieveByParams);
router.get('/retrieve_params', retrieveTwoParamsValidator, retrieveByTwoParams);
router.post('/delete',deleteSchedByID);
router.post('/delete_params', deleteParamsValidator, deleteSchedByParams)



module.exports = router;