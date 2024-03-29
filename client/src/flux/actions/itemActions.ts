import axios from 'axios';
import {ITEM_ERROR, GET_ITEMS, SET_CURRENTITEM, UPDATE_ITEM, CLEAR_CURRENTITEM, ITEMS_LOADING, ADD_ITEM, DELETE_ITEM 
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import {IItem, IExistingItem} from '../../types/interfaces';


export const getItems = () => (
  dispatch: Function, 
  getState: Function
  ) => {
    dispatch(setItemsLoading());
    axios
        .get('/api/items', tokenConfig(getState))
        .then(res=>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
          dispatch({
            type: ITEM_ERROR
          });
        });
};

export const addItem = (item: IItem) => (
  dispatch: Function,
  getState: Function
  ) => {
    axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res=>
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
        )
        .catch(err => {
          dispatch(
            returnErrors(err.response.data, err.response.status, 'ITEM_ERROR')
            );
          dispatch({
            type: ITEM_ERROR
          });
        });
};

export const updateItem = (item: IItem) => (
    dispatch: Function,
    getState: Function
    ) => {
    axios
    .put(`/api/items/${item._id}`, item, tokenConfig(getState))
    .then(res=>
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      }))
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
        dispatch({
          type: ITEM_ERROR
        });
      });
  }; 

  export const deleteItem = (id: string) => (
    dispatch: Function,
    getState: Function
    ) =>{
    axios
      .delete(`/api/items/${id}`, tokenConfig(getState))
      .then(res =>
        dispatch({
        type: DELETE_ITEM,
        payload: id
    })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_ERROR'));
      dispatch({
        type: ITEM_ERROR
      });
    });
};
  
  export const setCurrentItem = (item: IExistingItem) => {
    return {
      type: SET_CURRENTITEM,
      payload: item
    }
  }

  // clear current log
  export const clearCurrentItem = () => {
    return {
      type: CLEAR_CURRENTITEM
    }
  }
  
  export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};



