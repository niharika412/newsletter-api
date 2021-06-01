import {User} from '../model/users.js';

const services={}


services.register= async(userOBj)=>{
    let registration =await User.register(userOBj);
    if(registration)return registration;
}

services.login = async(userObj)=>{
    let loginStatus = await User.login(userObj);
    if (loginStatus) return loginStatus;
}

export const userServices=services;
