// Creating the redux store
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from  "../slices/todoSlice"

export const store = configureStore({
    reducer: todoReducer
})