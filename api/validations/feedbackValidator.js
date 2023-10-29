const createFeedbackValidator = (req,res,next)=>{
    if(!req.body.value){
        return res.json({
            success:false,
            error:'Rating is required!',
        })
    }
    next();
}

module.exports = createFeedbackValidator;