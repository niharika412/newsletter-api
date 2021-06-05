import * as express from 'express';
import {userServices} from '../services/userService.js';
import {dLServices} from '../services/distListService.js';
import {mailService} from '../services/mailService.js';

const router= express.Router();

router.post("/register",async(req,res,next)=>{
    try{
        let userObj = req.body;
        let registration = await userServices.register(userObj);
        res.json(registration)
    }
    catch(er){
        next(er);
    }
});


router.get("/login", async(req,res,next)=>{
    try{
        let userObj = req.body;
        let login = await userServices.login(userObj);
        res.json(login);
    }
    catch(er){
        next(er);
    }
});


router.post("/hostEmail", async(req,res,next)=>{
    try{
        let userObj = req.body;
        let setHost = await dLServices.setHost(userObj);
        res.json(setHost);
    }
    catch(er){
        next(er);
    }
});


router.get("/distributionList", async(req,res,next)=>{
    try{
        let userObj = req.body;
        let getDL = await dLServices.getDL(userObj);
        res.json(getDL);
    }
    catch(er){
        next(er);
    }
})


router.put("/customers/:customerID/:host",async(req,res,next)=>{
    try{
        let customerID = req.params.customerID;
        let host = req.params.host;
        let updateRes = await dLServices.updateCustomers(customerID,host);
        if (updateRes) return res.json({"message":"Email successfully added to the distribution list.✅"})
    }
    catch(er){
        next(er);
    }
})


router.put("/hostNames/:oldHost/:newHost", async(req,res,next)=>{
    try{
        let oldHost = req.params.oldHost;
        let newHost = req.params.newHost;
        let updateHost = await dLServices.updateHost(oldHost,newHost);
        if(updateHost) return res.json(updateHost)
    }
    catch(er){
        next(er);
    }
})

router.delete("/record/:host", async(req,res,next)=>{
    try{
        let host = req.params.host;
        let delRecord = await dLServices.delDL(host);
        if(delRecord) return res.json(delRecord)
    }
    catch(er){
        next(er);
    }
})


router.put("/newsletter", async(req,res,next)=>{
    try{
        let userCreds= req.body.userCreds;
        let text = req.body.text;
        let getDL = await dLServices.getDL({"hostName":userCreds.user});
        if(!getDL.message){
            let sendEmail = await mailService.sendEmail(userCreds,getDL.distributionList,text);
            if(sendEmail) return res.json(sendEmail);
        }
        else return res.json(getDL)
    }
    catch(er){
        next(er);
    }
})

export const Router = router;
