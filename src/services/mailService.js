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
    let transport = await transporter.sendMail(mailOptions, function(error,info){
        if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
    })
    if(transport) return transport;

}

export const mailService=mailingService;