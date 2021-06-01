import fs from 'fs';

let errLogger = (err,req,res,next)=>{
    fs.appendFile('./errorLogger.txt',new Date()+"  -  "+err.stack+"\n",(error)=>{
        if(error) console.log("Error in logging file");
        else{
            if(err.status) res.status(err.status);
            else res.status(500);
            res.json({'message':err.message});
        }
    })

};

export const errorLogger=errLogger;