import * as nodemailer from 'nodemailer';

let mailingService={}

mailingService.sendEmail = async (userCreds,target,emailText)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:userCreds
    })
    let mailOptions = {
        from: userCreds.user,
        to:target,
        text:emailText
    }
    let info = transporter.sendMail(mailOptions)
    if(!info) return next(new Error("Could not send email"))
    return 'Email sent: ' + (await info).response;

}

export const mailService=mailingService;