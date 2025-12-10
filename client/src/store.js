import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/UserSlice';
import  CarReducer  from "./features/CarSlice";

export const store=configureStore({
    reducer:{
        users: UserReducer,
        cars : CarReducer
    }
});