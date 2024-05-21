import {  combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";

import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  login: loginReducer,
});

export const logStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare)=>
    getDefaultMiddleWare({serializableCheck:false}) //do not look on serialization errors
});

