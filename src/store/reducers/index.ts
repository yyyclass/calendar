import {combineReducers} from 'redux';
import userReducer from "./user";
import themeReducer from "./theme";

export default combineReducers({
    user: userReducer,
    theme: themeReducer
})