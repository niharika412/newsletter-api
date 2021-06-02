import {distributionListServices} from "../model/distList.js";

const dlservices={}


dlservices.setHost= async(userOBj)=>{
    let set =await distributionListServices.setHost(userOBj);
    if(set)return "Host added successfully";
}

dlservices.getDL = async(userObj)=>{
    let distr = await distributionListServices.getDL(userObj);
    if (distr) return distr;
}


dlservices.updateCustomers = async(customerID,host)=>{
    let updateReq = await distributionListServices.addToDL(customerID,host);
    if (updateReq) return updateReq;
}

export const dLServices=dlservices;