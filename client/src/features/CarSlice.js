import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCar=createAsyncThunk("cars/getCar",async()=>{
    try{
        const response=await axios.get("http://localhost:5000/getCar");
        return response.data.cars;
    }
    catch(error){
        console.log(error);
    }
});

export const saveCar=createAsyncThunk("cars/addCar",async(pdata)=>{
    try{
        const response=await axios.post("http://localhost:5000/addCar",pdata);
        return response.data.message;
    }
    catch(error){
        console.log(error);
    }
});

export const updateCar=createAsyncThunk("cars/updateCar",async(pdata)=>{
    try{
        const response=await axios.put("http://localhost:5000/updateCar",pdata);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
});


export const deleteCar=createAsyncThunk("cars/deleteCar",async(id)=>{
    try{
        const response=await axios.delete(`http://localhost:5000/deleteCar/${id}`);
        return response;
    }
    catch(error){
        console.log(error);
    }
});

const initialStateValues = {
  cars: [],        
  message:"",
  isLoading:false,
  isSuccess:false,
  isError:false
};

export const CarSlice = createSlice({
  name: "car",
  initialState:initialStateValues,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveCar.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(saveCar.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.message=action.payload;
        })
        .addCase(saveCar.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
        })
      .addCase(getCar.pending, (state) => {
            state.isLoading = true;
      })
      .addCase(getCar.fulfilled, (state, action) => {
            state.isLoading=false;
            state.isSuccess=true;
            state.message=action.payload.message;
            state.cars=action.payload;
      })
      .addCase(getCar.rejected, (state, action) => {
            state.isLoading=false;
            state.isError=true;
      })
      .addCase(deleteCar.pending, (state) => {
            state.isLoading = true;
      })
      .addCase(deleteCar.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.cars = state.cars.filter(car=>car._id !== action.meta.arg);
      })
       .addCase(updateCar.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(updateCar.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;

        })
        .addCase(updateCar.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
        });

      
  },
});

export default CarSlice.reducer;
