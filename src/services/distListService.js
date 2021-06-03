import {distributionListServices} from "../model/distList.js";

const dlservices={}


dlservices.setHost= async(userOBj)=>{
    let set =await distributionListServices.setHost(userOBj);
    if(set)return "Record added successfully";
}

dlservices.getDL = async(userObj)=>{
    let distr = await distributionListServices.getDL(userObj);
    if (distr) return distr;
}


dlservices.updateCustomers = async(customerID,host)=>{
    let updateReq = await distributionListServices.addToDL(customerID,host);
    if (updateReq) return updateReq;
}


dlservices.updateHost = async (old,newH)=>{
    let updateReqHost = await distributionListServices.updateHost(old,newH);
    if (updateReqHost) return updateReqHost;
}

dlservices.delDL = async(host)=>{
    let deletedDL = await distributionListServices.deleteDL(host);
    if (deletedDL) return deletedDL;
}

export const dLServices=dlservices;