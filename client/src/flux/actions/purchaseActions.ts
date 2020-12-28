import axios from 'axios';
import {GET_PURCHASES, ADD_PURCHASES, PURCHASES_LOADING, PURCHASE_ERROR
} from './types';
import { tokenConfig } from './authActions';
import {IPurchase} from '../../types/interfaces';


export const getPurchases = () => async (
  dispatch: Function, 
  ) => {
    const header = await tokenConfig();

    dispatch(setPurchasesLoading());
    axios
        .get('/api/purchases', 
        header
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

export const addPurchases = (purchase: IPurchase) => async (
  dispatch: Function
  ) => {
    const header = await tokenConfig();
try{
    axios
    .post('/api/purchases', purchase, header
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
      }
      catch(err){
        dispatch({
          type: PURCHASE_ERROR
        });
      }
};
  
  export const setPurchasesLoading = () => {
    return {
        type: PURCHASES_LOADING
    };
};



