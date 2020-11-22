import {GET_EVENTS, GET_EVENT, ADD_EVENT, DELETE_EVENT, EVENTS_LOADING, UPDATE_EVENT, SET_CURRENT, CLEAR_CURRENT, LOG_ARRIVAL, EVENT_ERROR} from '../actions/types';
import {IAction, IEvent} from '../../types/interfaces';

const initialState = {
    events: [],
    current: [],
    loading: false
};

interface IState {
    events: IEvent[];
  }
  
export default function(state: IState=initialState, action: IAction){
    switch(action.type){
        case GET_EVENTS:
            return{
                ...state,
                events: action.payload,
                loading: false
            };
        case GET_EVENT:
            return{
                ...state,
                event: action.payload,
                loading: false
            };
        case ADD_EVENT:
            return{
                ...state,
                events:[action.payload, ...state.events],
                loading: false
            };
        case DELETE_EVENT:
            return{
                ...state,
                events: state.events.filter(event => event._id !== action.payload),
                loading: false
            };
        case UPDATE_EVENT:
            return {
                ...state,
                events: state.events.map(event => event._id === action.payload._id ? action.payload : event)
            };            
        case LOG_ARRIVAL:
            return {
                ...state,
                events: state.events.map(event => event._id === action.payload._id ? action.payload : event)
            };        
        // case SEARCH_EVENTS:
        //     return {
        //         ...state,
        //         events: payload
            // }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case EVENTS_LOADING:
            return{
                ...state,
                loading: true                
            }
        case EVENT_ERROR:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
}