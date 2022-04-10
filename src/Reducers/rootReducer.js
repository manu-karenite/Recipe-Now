import { combineReducers } from "redux";
import userReducer from "./userReducer.js";
import loginModal from "./loginModal.js";
export const rootReducer = combineReducers({
  user: userReducer,
  login: loginModal,
});
