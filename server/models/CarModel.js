import mongoose from "mongoose";

const CarSchema=mongoose.Schema({
    carName:{type:String,required:true},
    carPrice:{type:String,required:true},
    carImg:{type:String,required:true},
    carDoor:{type:String,required:true},
    carPass:{type:String,required:true},
    transmission:{type:String,required:true},
});
const CarModel=mongoose.model("Cars",CarSchema,"Cars");
export default CarModel;