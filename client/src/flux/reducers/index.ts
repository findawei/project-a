import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import inviteReducer from './inviteReducer';
import itemReducer from './itemReducer';
import purchaseReducer from './purchaseReducer';

export default combineReducers({
    event: eventReducer,
    auth: authReducer,
    error: errorReducer,
    invite: inviteReducer,
    item: itemReducer,
    purchase: purchaseReducer
});