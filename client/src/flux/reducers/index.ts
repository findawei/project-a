import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import authReducer from './authReducer';
import itemReducer from './itemReducer';
import purchaseReducer from './purchaseReducer';

export default combineReducers({
    event: eventReducer,
    auth: authReducer,
    item: itemReducer,
    purchase: purchaseReducer
});