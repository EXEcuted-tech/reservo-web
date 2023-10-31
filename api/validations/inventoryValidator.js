const createInventoryValidator = (req,res,next)=>{
    // if (typeof req.body !== 'string') {
    //     return res.json({
    //       success: false,
    //       error: { text: ['value should be text'] },
    //     });
    //   }
    next()
}

module.exports = createInventoryValidator;