import fs from 'fs';

let reqLogger = (req,res,next)=>{
    fs.appendFile('./requestLogger.txt',new Date() + " - "+ req.method + " - "+ req.url+" \n",(error)=>{
        if(error) return next(err);
        else next();
    })
}

export const requestLogger=reqLogger;