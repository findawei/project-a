import axios from 'axios';
import {INVITE_ERROR, GET_INVITES, SET_CURRENTINVITE, CLEAR_CURRENTINVITE, INVITES_LOADING, RESPONSE_INVITE 
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import {IInvite, IExistingInvite} from '../../types/interfaces';


export const getInvites = () => (
  dispatch: Function, 
  getState: Function
  ) => {
    dispatch(setInvitesLoading());
    axios
        .get('/api/events/invites', tokenConfig(getState))
        .then(res=>
            dispatch({
                type: GET_INVITES,
                payload: res.data
            })
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status, 'INVITE_ERROR'));
          dispatch({
            type: INVITE_ERROR
          });
        });
};

export const addInvite = (invite: IInvite) => (
  dispatch: Function,
  getState: Function
  ) =>{
  axios
    .put(`/api/events/response/${invite._id}`, invite, tokenConfig(getState))
    .then(res =>
      dispatch({
      type: RESPONSE_INVITE,
      payload: invite._id
  })
  )
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'INVITE_ERROR'));
    dispatch({
      type: INVITE_ERROR
    });
  });
};

export const declineInvite = (invite: IInvite) => (
  dispatch: Function,
  getState: Function
  ) =>{
  axios
    .put(`/api/events/decline/${invite._id}`, invite, tokenConfig(getState))
    .then(res =>
      dispatch({
      type: RESPONSE_INVITE,
      payload: invite._id
  })
  )
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'INVITE_ERROR'));
    dispatch({
      type: INVITE_ERROR
    });
  });
};

  export const setCurrentInvite = (invite: IExistingInvite) => {
    return {
      type: SET_CURRENTINVITE,
      payload: invite
    }
  }

  // clear current log
  export const clearCurrentInvite = () => {
    return {
      type: CLEAR_CURRENTINVITE
    }
  }
  
  export const setInvitesLoading = () => {
    return {
        type: INVITES_LOADING
    };
};



