import {combineReducers} from 'redux';
import eventReducer from './eventReducer';
import authReducer from './authReducer';
import inviteReducer from './inviteReducer';
import itemReducer from './itemReducer';
import purchaseReducer from './purchaseReducer';

export default combineReducers({
    event: eventReducer,
    auth: authReducer,
    invite: inviteReducer,
    item: itemReducer,
    purchase: purchaseReducer
});