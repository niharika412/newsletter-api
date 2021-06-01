import {collect} from "./connection.js";

let dlServices={}

dlServices.setHost= async(hostname)=>{
    let distDB = await collect.getDistributionList();
    let setHostName = await distDB.create(hostname);
    if(setHostName) return setHostName;
    else{
        let err= new Error("Host was not set");
        err.status = 500;
        throw err;
    }
}

dlServices.getDL = async(hostObj)=>{
    let distDB = await collect.getDistributionList();
    let distL = await distDB.findOne({"hostName":hostObj.hostName},{_id:0})
    if(distL) return distL;
    else{
        let err= new Error("Some error occured");
        err.status = 500;
        throw err;
    }
}

export const distributionListServices=dlServices;