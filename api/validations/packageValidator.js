const { isValidDate, isValidTime }= require('../helpers/date-time')

const createPackageValidator = (req,res,next)=>{
    if(!req.body.package_name){
        return res.json({
            success:false,
            error:{text:['package name is empty']},
        })
    }

    if(!req.body.package_desc){
        return res.json({
            success:false,
            error:{text:['package description is empty']},
        })
    }

    if(!req.body.date_start){
        return res.json({
            success:false,
            error:{text:['start date is empty!']},
        })
    }

    // if (isValidDate(res.body.date_start) == true){
    //     return res.json({
    //         success:false,
    //         error:{text:['start date is invalid!']},
    //     })
    // }

    // if(isValidTime(res.body.time_start) == true){
    //     return res.json({
    //         success:false,
    //         error:{text:['start time is invalid!']},
    //     })
    // }

    if(!req.body.date_start){
        return res.json({
            success:false,
            error:{text:['start date is empty!']},
        })
    }

    if(!req.body.time_start){
        return res.json({
            success:false,
            error:{text:['time start empty']},
        })
    }

    if(!req.body.price){
        return res.json({
            success:false,
            error:{text:['price is empty!']},
        })
    }

    if(!req.body.merchant_id){
        return res.json({
            success:false,
            error:{text:['No merchant ID!']},
        })
    }
    

    next();
}

const updatePackageValidator = (req,res,next)=>{
    if(!req.body.package_name){
        return res.json({
            success:false,
            error:{text:['package name is empty']},
        })
    }

    if(!req.body.package_desc){
        return res.json({
            success:false,
            error:{text:['package description is empty']},
        })
    }

    if(!req.body.date_start){
        return res.json({
            success:false,
            error:{text:['start date is empty!']},
        })
    }

    // if (isValidDate(res.body.date_start) == true){
    //     return res.json({
    //         success:false,
    //         error:{text:['start date is invalid!']},
    //     })
    // }

    // if(isValidTime(res.body.time_start) == true){
    //     return res.json({
    //         success:false,
    //         error:{text:['start time is invalid!']},
    //     })
    // }

    if(!req.body.date_start){
        return res.json({
            success:false,
            error:{text:['start date is empty!']},
        })
    }

    if(!req.body.time_start){
        return res.json({
            success:false,
            error:{text:['time start empty']},
        })
    }

    if(!req.body.price){
        return res.json({
            success:false,
            error:{text:['price is empty!']},
        })
    }
    

    next();
}

module.exports = [createPackageValidator, updatePackageValidator];