import {GET_INVITES, SET_CURRENTINVITE, CLEAR_CURRENTINVITE, INVITES_LOADING, INVITE_ERROR, RESPONSE_INVITE} from '../actions/types';
import {IAction, IInvite} from '../../types/interfaces';

const initialState = {
    invites: [],
    currentInvite: [],
    loading: false
};

interface IState {
    invites: IInvite[];
  }
  
export default function(state: IState=initialState, action: IAction){
    switch(action.type){
        case GET_INVITES:
            return{
                ...state,
                invites: action.payload,
                loading: false
            };
        case RESPONSE_INVITE:
            return{
                ...state,
                invites: state.invites.filter(invite => invite._id !== action.payload), 
                loading: false
            }
        case SET_CURRENTINVITE:
            return {
                ...state,
                currentInvite: action.payload
            }
        case CLEAR_CURRENTINVITE:
            return {
                ...state,
                currentInvite: null
            }
        case INVITES_LOADING:
            return{
                ...state,
                loading: true                
            }
        case INVITE_ERROR:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
}