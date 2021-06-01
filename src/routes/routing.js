import * as express from 'express';
import {userServices} from '../services/userService.js';
import {dLServices} from '../services/distListService.js';

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


router.put("/hostEmail", async(req,res,next)=>{
    try{
        let userObj = req.body;
        let setHost = await dLServices.setHost(userObj);
        res.json(setHost);
    }
    catch(er){
        next(er);
    }
})
export const Router = router;
