import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import checkNew from "./checkNew";

const rootReducer = combineReducers({ checkNew });

const store = configureStore({ reducer: rootReducer });

export default store;
