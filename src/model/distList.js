import {collect} from "./connection.js";

let dlServices={}

dlServices.setHost= async(hostname)=>{
    let distDB = await collect.getDistributionList();
    let setHostName = await distDB.create(hostname);
    if(setHostName) return true;
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

dlServices.addToDL = async(mailID,host)=>{
    let distDB = await collect.getDistributionList();
    let added = await distDB.updateOne({"hostName":host},{$push:{"distributionList":mailID}});
    if(added) return added;
    else{
        let err= new Error("Some error occured");
        err.status = 500;
        throw err;
    }
}

export const distributionListServices=dlServices;