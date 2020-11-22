import axios from 'axios';
import {GET_EVENTS, GET_EVENT, ADD_EVENT, DELETE_EVENT, EVENTS_LOADING, SET_CURRENT, CLEAR_CURRENT, UPDATE_EVENT, LOG_ARRIVAL, EVENT_ERROR, GET_INVITES 
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import {IEvent, IExistingEvent} from '../../types/interfaces';

export const getEvents = () => (
  dispatch: Function, 
  getState: Function
  ) => {
    dispatch(setEventsLoading());
    axios
        .get('/api/events', tokenConfig(getState))
        .then(res=>
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            })
        )
        .catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status, 'EVENT_ERROR'));
          dispatch({
            type: EVENT_ERROR
          });
        });
};

export const getEvent = (id: string) => (
  dispatch: Function,   
  getState: Function
  ) => {
  dispatch(setEventsLoading());
  axios
      .get(`/api/events/${id}`, tokenConfig(getState))
      .then(res=>
          dispatch({
              type: GET_EVENT,
              payload: res.data
          })
      )
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'EVENT_ERROR'));
        dispatch({
          type: EVENT_ERROR
        });
      });
};

export const addEvent = (event: IEvent) => (
  dispatch: Function,
  getState: Function
  ) => {
    axios
    .post('/api/events', event, tokenConfig(getState))
    .then(res=>
        dispatch({
            type: ADD_EVENT,
            payload: res.data
        })
        )
        .catch(err => {
          dispatch(
            returnErrors(err.response.data, err.response.status, 'EVENT_ERROR')
            );
          dispatch({
            type: EVENT_ERROR
          });
        });
};

export const updateEvent = (event: IEvent) => (
  dispatch: Function,
  getState: Function
  ) => {
  axios
  .put(`/api/events/${event._id}`, event, tokenConfig(getState))
  .then(res=>
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'EVENT_ERROR'));
      dispatch({
        type: EVENT_ERROR
      });
    });
}; 

export const logArrival = (event: IEvent) => (
  dispatch: Function,
  getState: Function
  ) => {
  axios
  .put(`/api/events/log/${event._id}`, event, tokenConfig(getState))
  .then(res=>
    dispatch({
      type: LOG_ARRIVAL,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'EVENT_ERROR'));
      dispatch({
        type: EVENT_ERROR
      });
    });
}; 

// set current log
export const setCurrent = (event: IExistingEvent) => {
    return {
      type: SET_CURRENT,
      payload: event
    }
  }

  // clear current log
  export const clearCurrent = () => {
    return {
      type: CLEAR_CURRENT
    }
  }
  
  export const setEventsLoading = () => {
    return {
        type: EVENTS_LOADING
    };
};

  export const deleteEvent = (id: string) => (
    dispatch: Function,
    getState: Function
    ) =>{
    axios
      .delete(`/api/events/${id}`, tokenConfig(getState))
      .then(res =>
        dispatch({
        type: DELETE_EVENT,
        payload: id
    })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'EVENT_ERROR'));
      dispatch({
        type: EVENT_ERROR
      });
    });
};

// // Delete attendee
// export const deleteAttendee = (id: string) => (
//   dispatch: Function,
//   getState: Function
//   ) =>{
//   axios
//     .delete(`/api/events/attendee/${id}`, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//       type: UPDATE_EVENT,
//       payload: id
//   })
//   )
//   .catch(err => {
//     dispatch(returnErrors(err.response.data, err.response.status, 'EVENT_ERROR'));
//     dispatch({
//       type: EVENT_ERROR
//     });
//   });
// };


