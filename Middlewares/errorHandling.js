export const errorHandling=(err,req,res,next)=>{
    let statusCode=req.statusCode||500;
    let message=req.message||"מצטערים התרחשה שגיאה";
    res.status(statusCode).send(message);

}