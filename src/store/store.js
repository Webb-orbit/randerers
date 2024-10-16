import { configureStore } from "@reduxjs/toolkit";
import clientslice from "./userslice"
import dashslice from "./dashslice";
import toastslice from "./Toastslice";

export const store = configureStore({
    reducer:{
        clientstore: clientslice,
        dashstore: dashslice,
        toaststore: toastslice
    }
    
})