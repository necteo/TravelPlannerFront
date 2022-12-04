import { combineReducers } from "redux";
import { createStore } from "redux";
import checkNew from "./checkNew";

const rootReducer = combineReducers({ checkNew });

const store = createStore(rootReducer);

export default store;
