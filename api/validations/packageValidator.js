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

    if(!req.body.date_end){
        return res.json({
            success:false,
            error:{text:['end date is empty!']},
        })
    }

    if(!req.body.date_start){
        return res.json({
            success:false,
            error:{text:['start date is empty!']},
        })
    }
}

module.exports = createPackageValidator;