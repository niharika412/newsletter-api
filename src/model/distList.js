import {collect} from "./connection.js";

let dlServices={}

dlServices.setHost= async(hostname)=>{
    let distDB = await collect.getDistributionList();
    let alreadyInList = await dlServices.getDL(hostname);
    if(alreadyInList){
        let err= new Error("This account is already in the database. Please update or delete.");
        err.status = 500;
        throw err;
    }
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
        let err= new Error("No such account in the database");
        err.status = 500;
        throw err;
    }
}

dlServices.addToDL = async(mailID,host)=>{
    let distDB = await collect.getDistributionList();
    let alreadyInList = await dlServices.getDL({"hostName":host});
    if(alreadyInList){
        let err= new Error("This account is not in the database.");
        err.status = 500;
        throw err;
    }
    let added = await distDB.updateOne({"hostName":host},{$push:{"distributionList":mailID}});
    if(added) return added;
    else{
        let err= new Error("Some error occurred");
        err.status = 500;
        throw err;
    }
}


dlServices.updateHost = async(oldHost, newHost)=>{
    let distDB = await collect.getDistributionList();
    let updated = await distDB.updateOne({"hostName":oldHost},{$set:{"hostName":newHost}})
    if(updated.nModified==1) return updated;
    else if(updated.nModified==0){
        let err = new Error("No such host in distribution list");
        err.status = 500;
        throw err;
    }
    else{
        let err = new Error("Record not found");
        err.status = 500;
        throw err;
    }
}

dlServices.deleteDL = async(hostName)=>{
    let distDB = await collect.getDistributionList();
    let deleted = await distDB.deleteOne({"hostName":hostName});
    if(deleted.nModified==1) return deleted;
    else{
        let err = new Error("Record not found");
        err.status = 500;
        throw err;
    }

}

dlServices.delCustomer = async(host,customer)=>{
    let distDB = await collect.getDistributionList();
    let checkIfInDB = await dlServices.getDL({"hostName":host});
    let deleteCustomer = await distDB.updateOne({"hostName":host},{$pull:{distributionList:customer}});
    if(deleteCustomer.nModified==1) return deleteCustomer;
    else if(deleteCustomer.nModified==0){
        let err = new Error("No such email in distribution list");
        err.status = 500;
        throw err;
    }
    else{
        let err = new Error("Record not found");
        err.status = 500;
        throw err;
    }
}


export const distributionListServices=dlServices;