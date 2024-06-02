const asyncHandler = (requestHandler) => {
    return (res,req,next) => {
    Promise.resolve(requestHandler(res,req,next)).catch((err)=>next(err))
}
}

export {
    asyncHandler
}



// const asyncHandler = (fn) => async(req,res,next)
// =>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(err.code || 500).json({
//             success:false,
//             error:error.message || "Internal server error"
//         })
//     }
// }