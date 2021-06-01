import {collect} from "./connection";

const user={}

user.generateId= async()=>{
    let usersDB= await collect.getNusersCollection();
    let uIds= await usersDB.distinct("userId");
    let maxId = Math.max(...uIds);
    if(maxId) return maxId +1;
    else return 1111;
}
