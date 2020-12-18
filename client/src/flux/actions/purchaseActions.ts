import axios from 'axios';
import {GET_PURCHASES, ADD_PURCHASES, PURCHASES_LOADING, PURCHASE_ERROR
} from './types';
import { tokenConfig } from './authActions';
import {IPurchase} from '../../types/interfaces';


export const getPurchases = () => (
  dispatch: Function, 
  getState: Function
  ) => {
    dispatch(setPurchasesLoading());
    axios
        .get('/api/purchases', 
        // tokenConfig(getState)
        )
        .then(res=>
            dispatch({
                type: GET_PURCHASES,
                payload: res.data
            })
        )
        .catch(err => {
          dispatch({
            type: PURCHASE_ERROR
          });
        });
};

export const addPurchases = (purchase: IPurchase) => (
  dispatch: Function,
  getState: Function
  ) => {
    axios
    .post('/api/purchases', purchase, 
    // tokenConfig(getState)
    )
    .then(res=>
        dispatch({
            type: ADD_PURCHASES,
            payload: res.data
        })
        )
        .catch(err => {
          dispatch({
            type: PURCHASE_ERROR
          });
        });
};
  
  export const setPurchasesLoading = () => {
    return {
        type: PURCHASES_LOADING
    };
};



