import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/UserModel.js';
import bcrypt from 'bcrypt';
import CarModel from './models/CarModel.js';

const app=express();
app.use(cors());
app.use(express.json());

try{
    const conStr="mongodb+srv://admin:ahmed@cluster0.i8mv0bl.mongodb.net/CarRentDB?appName=Cluster0";
    mongoose.connect(conStr);
    console.log("Database Connected..")
}
catch(error){
    console.log("Database connection error.."+error);
}

app.listen(5000,()=>{
    console.log("Server connected at port number 5000..")
})

app.post("/login",async(req,res)=>{
    try{
        const user=await UserModel.findOne({email:req.body.email});
        if(user){
            const pwd_match=await bcrypt.compare(req.body.password,user.password);
            if(pwd_match)
                res.status(200).json({user:user,message:"Success"});
            else
                res.status(200).json({message:"Invalid Credentials"});
        }
        else{
            
            res.status(500).json({message:"User not found"});
        }
    }
    catch(error){
        res.send(error);
    }
});

app.post("/register",async(req,res)=>{
    try{
        const {uname,email,password,phone}=req.body;
        const hash_password=await bcrypt.hash(password,10);
        const user=await UserModel.findOne({email:email});
        if(!user){
            const new_user=new UserModel({
                uname:uname,
                email:email,
                password:hash_password,
                phone:phone
            });
            await new_user.save();
            res.status(200).json({message:"Success"});
        }
        else{
            res.status(500).json({message:"User already exist"});
        }
    }
    catch(error){
        res.send(error);
    }
});


app.get("/getCar",async(req,res)=>{
    try{
        const carInList = await CarModel.aggregate([
            {
                "$project":{
                    "Cars._id":0,
                }
            }
        ]);
        res.json({cars:carInList})
    }
    catch(error){
        res.send(error);
    }
});

app.post("/addCar",async(req,res)=>{
    try{
        const {carImg,carName,carPrice,carDoor,carPass,transmission}=req.body;
        const new_car=new CarModel({
            carName:carName,
            carPrice:carPrice,
            carImg:carImg,
            carDoor:carDoor,
            carPass:carPass,
            transmission:transmission
        });
        await new_car.save();
        res.status(200).json({message:"Success", car :new_car});

    }
    catch(error){
        res.send(error);
    }
});

app.delete("/deleteCar/:id", async (req, res) => {
    try {
        const car = await CarModel.findByIdAndDelete(req.params.id);
        if (car) res.status(200).json({ message: "Car deleted" });
        else res.status(404).json({ message: "Car not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
 
app.put("/updateCar/", async (req, res) => {
    try {
        const car = await CarModel.findOne({_id:req.body._id});

            car.carName = req.body.carName ;
            car.carPrice = req.body.carPrice ;
            car.carImg = req.body.carImg ;
            car.carDoor = req.body.carDoor ;
            car.carPass = req.body.carPass ;
            car.transmission = req.body.transmission ;
            await car.save();
            res.status(200).json({ car:car,message: "Car updated"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

 
