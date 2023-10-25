const createInventoryValidator = (req,res,next)=>{
    // console.log(req.body)
    // if (typeof req.body !== 'string') {
    //     return res.json({
    //       success: false,
    //       error: { text: ['value should be text'] },
    //     });
    //   }
    next()
}

module.exports = createInventoryValidator;