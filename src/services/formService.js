import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

let formservice={}

formservice.sendFileAccToForm = async(keyword,target)=>{
    if(keyword=="Subscribed"){
        let sub= fs.readFileSync("./services/subscribed.txt",'utf8');
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                "user":"contact.reesoi@gmail.com",
                "pass":"#"
            }
        })
        let mailOptions = {
            from: "contact.reesoi@gmail.com",
            to:target,
            text:sub,
            subject:"Welcome"
        }
        let info = transporter.sendMail(mailOptions);
        if(!info) return next(new Error("Could not send email"));
        return 'Email sent: ' + (await info).response;
    }else if(keyword == "Unsubscribed"){
        let unsub = fs.readFileSync("./services/unSubscribed.txt",'utf8');
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                "user":"contact.reesoi@gmail.com",
                "pass":"#"
            }
        })
        let mailOptions = {
            from: "contact.reesoi@gmail.com",
            to:target,
            text:unsub,
            subject:":<"
        }
        let info = transporter.sendMail(mailOptions);
        if(!info) return next(new Error("Could not send email"));
        return 'Email sent: ' + (await info).response;
    }else if(keyword == "No Action"){
        let na = fs.readFileSync("./services/na.txt",'utf8');
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                "user":"contact.reesoi@gmail.com",
                "pass":"#"
            }
        })
        let mailOptions = {
            from: "contact.reesoi@gmail.com",
            to:target,
            text:na,
            subject:":)"
        }
        let info = transporter.sendMail(mailOptions);
        if(!info) return next(new Error("Could not send email"));
        return 'Email sent: ' + (await info).response;
    }else{
        let e = new Error("Error not defined")
        e.status(500);
        throw e;
    }
}

export const formService = formservice;