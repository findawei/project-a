import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, UPDATE_ITEM, SET_CURRENTITEM, CLEAR_CURRENT, ITEM_ERROR} from '../actions/types';
import {IAction, IItem} from '../../types/interfaces';

const initialState = {
    items: [],
    currentItem: [],
    loading: false
};

interface IState {
    items: IItem[];
  }
  
export default function(state: IState=initialState, action: IAction){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items: action.payload,
                loading: false
            };
        case ADD_ITEM:
            return{
                ...state,
                items:[action.payload, ...state.items],
                loading: false
            };
        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter(item => item._id !== action.payload),
                loading: false
            };
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item => item._id === action.payload._id ? action.payload : item)
            };            
        case SET_CURRENTITEM:
            return {
                ...state,
                currentItem: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case ITEMS_LOADING:
            return{
                ...state,
                loading: true                
            }
        case ITEM_ERROR:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
}