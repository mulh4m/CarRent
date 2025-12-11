import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const getUser=createAsyncThunk("users/getUser",async(udata)=>{
    try{
        const response=await axios.post("https://carrent-1-pgml.onrender.com/login",udata);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
});

export const addUser=createAsyncThunk("users/addUser",async(udata)=>{
    try{
        const response=await axios.post("https://carrent-1-pgml.onrender.com/register",udata);
        return response.data.message;
    }
    catch(error){
        if(error.response && error.response.data){
            return error.response.data.message;
        }
        return error.message;
    }
});

const initVal={
    user:{},
    message:"",
    isLoading:false,
    isSuccess:false,
    isError:false
}

export const UserSlice=createSlice({
    name:"users",
    initialState:initVal,
    reducers:{
        clearMessage: (state) => {
            state.message = "";
            state.isSuccess = false;
            state.isError = false;
        },
        logout: (state) => {
            state.user = {};
            state.message = "";
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.message=action.payload;
        })
        .addCase(addUser.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
        })
        .addCase(getUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.message=action.payload.message;
            state.user=action.payload.user;
        })
        .addCase(getUser.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
        })
    }
});

export const {clearMessage,logout} = UserSlice.actions;

export default UserSlice.reducer;
