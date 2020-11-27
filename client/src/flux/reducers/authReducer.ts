// import {
//   USER_LOADED,
//   USER_LOADING,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT_SUCCESS,
//   LOGOUT_ERROR,
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   USER_POINTS,
//   RESET_SUCCESS,
//   RESET_ERROR
// } from '../actions/types';

// const initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: null,
//   isLoading: false,
//   user: null,
//   // authMsg: ""
// };

// export default function(state = initialState, action: any) {
//   switch (action.type) {
//     case USER_LOADING:
//       return {
//         ...state,
//         isLoading: true
//       };
//     case USER_LOADED:
//       return {
//         ...state,
//         isAuthenticated: true,
//         isLoading: false,
//         user: action.payload
//       };
//     case USER_POINTS:
//       return {
//         ...state,
//         isAuthenticated: true,
//         isLoading: false,
//         user: action.payload
//       };
//     case LOGIN_SUCCESS:
//     case REGISTER_SUCCESS:
//       localStorage.setItem('token', action.payload.token);
//       return {
//         ...state,
//         ...action.payload,
//         isAuthenticated: true,
//         isLoading: false,
//         // authMsg: ""
//       };
//     case AUTH_ERROR:
//     case LOGIN_FAIL:
//     case LOGOUT_SUCCESS:
//     case REGISTER_FAIL:
//     case LOGOUT_ERROR:
//       localStorage.removeItem('token');
//       return {
//         ...state,
//         token: null,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false,
//         // authMsg: action.payload
//       };
//     default:
//       return state;
//   }
// }



import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  EMAIL_NOT_VERIFIED,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  RESET_SUCCESS,
  RESET_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  authMsg: ""
};

export default function(state = INITIAL_STATE, action: any) {
  if (action.type === SIGNIN_SUCCESS || action.type === SIGNOUT_SUCCESS) {
    return { ...state, authMsg: "" };
  } else if (
    action.type === SIGNUP_SUCCESS ||
    action.type === SIGNUP_ERROR ||
    action.type === SIGNIN_ERROR ||
    action.type === EMAIL_NOT_VERIFIED ||
    action.type === SIGNOUT_ERROR ||
    action.type === RESET_SUCCESS ||
    action.type === RESET_ERROR
  ) {
    return { ...state, authMsg: action.payload };
  } else {
    return state;
  }
}