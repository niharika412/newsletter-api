import {collect} from "./connection.js";

const user={}

user.generateId= async()=>{
    let usersDB= await collect.getNusersCollection();
    let uIds= await usersDB.distinct("userId");
    let maxId = Math.max(...uIds);
    if(maxId) return maxId +1;
    else return 1111;
}

user.register= async(userObj)=>{
    let usersDB= await collect.getNusersCollection();
    let added = await usersDB.create(userObj);
    if(added) return added;
    else{
        let err= new Error("Registration not successful.Please try again later 📌");
        err.status = 500;
        throw err;
    }
}

user.login = async(userObj)=>{
    let userDB= await collect.getNusersCollection();
    let checkUser = await userDB.findOne({userName:userObj.userName,password:userObj.password},{_id:0});
    if(!checkUser){
        let err = new Error("You are not registered. Please register to continue");
        err.status= 500;
        throw err;
    }
    return checkUser;
}

export const User=user;
