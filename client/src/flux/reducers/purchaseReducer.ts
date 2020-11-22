import {GET_PURCHASES, ADD_PURCHASES, PURCHASES_LOADING, PURCHASE_ERROR} from '../actions/types';
import {IAction, IPurchase} from '../../types/interfaces';

const initialState = {
    purchases: [],
    loading: false
};

interface IState {
    purchases: IPurchase[];
  }
  
export default function(state: IState=initialState, action: IAction){
    switch(action.type){
        case GET_PURCHASES:
            return{
                ...state,
                purchases: action.payload,
                loading: false
            };
        case ADD_PURCHASES:
            return{
                ...state,
                purchases:[action.payload, ...state.purchases],
                loading: false
            };
        case PURCHASES_LOADING:
            return{
                ...state,
                loading: true                
            }
        case PURCHASE_ERROR:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
}