import {distributionListServices} from "../model/distList.js";

const dlservices={}


dlservices.setHost= async(userOBj)=>{
    let set =await distributionListServices.setHost(userOBj);
    if(set)return set;
}

dlservices.getDL = async(userObj)=>{
    let distr = await distributionListServices.getDL(userObj);
    if (distr) return distr;
}

export const dLServices=dlservices;