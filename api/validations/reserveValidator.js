const {isValidDate,isValidTime}=require('../helpers/date-time')

const createReserveValidator = (req,res,next)=>{
    const { date, timestart, location, size, settings, addeets, acc_id, merch_id, sched_id, pack_id, pay_id, invent_id } = req.body;

    const errors = {};

    if (!date || !isValidDate(date)) {
        errors.date = ['Date is required and must be a valid date (YYYY-MM-DD)'];
    }
    if (!timestart || !isValidTime(timestart)) {
        errors.timestart = ['Start time is required and must be a valid timestamp'];
    }
    if (!location || typeof location !== 'string') {
        errors.location = ['Location is required and must be a string'];
    }
    if (!size || typeof size !== 'number') {
        errors.size = ['Event Size is required and must be a number'];
    }
    if (!acc_id || typeof acc_id !== 'number') {
        errors.acc_id = ['User Account ID is required and must be a number'];
    }
    if (!merch_id || typeof merch_id !== 'number') {
        errors.merch_id = ['Merchant ID is required and must be a number'];
    }
    if (!pack_id || typeof pack_id !== 'number') {
        errors.pack_id = ['Package ID is required and must be a number'];
    }
    if (!pay_id || typeof pay_id !== 'number') {
        errors.pay_id = ['Payment ID is required and must be a number'];
    }
    if (!invent_id || typeof invent_id !== 'number'){
        errors.inventory_id = ['Inventory ID is required and must be a number'];
    }
    if (!invent_id || typeof invent_id !== 'number'){
        errors.inventory_id = ['Inventory ID is required and must be a number'];
    }

    //Not Required
    if (settings && typeof settings !== 'object') {
        errors.settings = ['Settings must be an object'];
    }
    if (addeets && typeof addeets !== 'string') {
        errors.addeets = ['Additional details must be a string'];
    }
    if (sched_id && typeof sched_id !== 'number') {
        errors.sched_id = ['Schedule ID must be a number'];
    }


    if (Object.keys(errors).length > 0) {
        return res.json({
            status: 404,
            success: false,
            error: errors,
        });
    }

    next();
}

module.exports = createReserveValidator;