import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import inviteReducer from './inviteReducer';
import itemReducer from './itemReducer';
import purchaseReducer from './purchaseReducer';
import { firebaseReducer } from "react-redux-firebase";
import apiStatusReducer from "./apiStatusReducer";


export default combineReducers({
    event: eventReducer,
    auth: authReducer,
    error: errorReducer,
    invite: inviteReducer,
    item: itemReducer,
    purchase: purchaseReducer,
    firebase: firebaseReducer,
    apiStatus: apiStatusReducer
});