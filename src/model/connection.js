import * as mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userId:{type:String,unique:true},
    password:{type:String, unique:true}
},{collection:"newsletter-users", toObject:{versionKey:false}});

let collection={}

const connectionOptions = {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
}
const usersDBURL = 'mongodb://localhost:27017/NusersDB';

collection.getNusersCollection= async()=>{
    try{
        let database= await mongoose.connect(usersDBURL,connectionOptions);
        let userModel = await database.model('User',userSchema);
        return userModel;
    }
    catch(error){
        let err = new Error("Could not connect to database");
        err.status=500;
        throw err;
    }
}

export const collect=collection;