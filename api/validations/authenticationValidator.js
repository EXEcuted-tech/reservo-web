const authenticationValidator = (req,res,next)=>{
    if(!req.body.account_email){
        return res.json({
            success:false,
            error:{text:['email is required']},
        })
    }

    if(!req.body.password){
        return res.json({
            success:false,
            error:{text:['password is required']},
        })
    }

    if(req.body.password.length < 8){
        return res.json({
            success:false,
            error:{text:['password is too short']},
        })
    }

    if(req.body.account_name.length < 8 || !req.body.account_name){
        return res.json({
            success:false,
            error:{text:['account name is invalid']},
        })
    }

    if(!req.body.contact_number){
        return res.json({
            success:false,
            error:{text:['contact number is empty']},
        })
    }

    switch(req.body.account_type){
        case 1:
        case 50:
        case 30:
            break;
        default:
            return res.json({
                success:false,
                error:{text:['Err_account Type']},
            })
    }
    
    

    next();
}

module.exports = authenticationValidator; 