import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

let mailingService={}

mailingService.sendEmail = async (userCreds,target,emailTextPath)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:userCreds
    })
    let textRead = await mailingService.getFile(emailTextPath);
    console.log(textRead)
    let mailOptions = {
        from: userCreds.user,
        to:target,
        text:textRead
    }
    let info = transporter.sendMail(mailOptions)
    if(!info) return next(new Error("Could not send email"))
    return 'Email sent: ' + (await info).response;

}

mailingService.getFile = async(path)=>{
    try {
        const data = fs.readFileSync(path, 'utf8');
        return data;
      } catch (err) {
        next(err);
      }
}

export const mailService=mailingService;