import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    uname:{type:String,required:true},
    email:{type:String,required:true,lowercase:true,trim:true,unique:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true}
});
const UserModel=mongoose.model("Users",UserSchema,"Users");
export default UserModel;