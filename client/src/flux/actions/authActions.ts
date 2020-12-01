import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  USER_POINTS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_ERROR,
  


  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  EMAIL_NOT_VERIFIED,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  RESET_SUCCESS,
  RESET_ERROR

} from './types';
import { IAuthFunction, IConfigHeaders, IUser } from '../../types/interfaces';
import { beginApiCall, apiCallError } from "./apiStatusActions";
import firebase from "../../firebase";

// Check token & load user
export const loadUser = () => (dispatch: Function, getState: Function) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Log points to user profile
export const logPoints = (user: IUser) => (dispatch: Function, getState: Function) => {
  axios
  .put('/api/auth/points', user, tokenConfig(getState))
  .then(res=>
    dispatch({
      type: USER_POINTS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
}; 

// Register User
export const register = ({ email, password }: IAuthFunction) => async (dispatch: Function) => {
  try {
    dispatch(beginApiCall());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(dataBeforeEmail => {
        firebase.auth().onAuthStateChanged(function(user) {
          user!.sendEmailVerification();
        });
      })
      .then(dataAfterEmail => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // Sign up successful
            dispatch({
              type: REGISTER_SUCCESS,
              payload:
                "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
            });
          } else {
            // Signup failed
            dispatch({
              type: REGISTER_FAIL,
              payload:
                "Something went wrong, we couldn't create your account. Please try again."
            });
          }
        });
      })
      .catch(() => {
        dispatch(apiCallError());
        dispatch({
          type: REGISTER_FAIL,
          payload:
            "Something went wrong, we couldn't create your account. Please try again."
        });
      });
  } catch (err) {
    dispatch(apiCallError());
    dispatch({
      type: REGISTER_FAIL,
      payload:
        "Something went wrong, we couldn't create your account. Please try again."
    });
  }
  //pre-firebase
  // // Headers
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // };

  // // Request body
  // const body = JSON.stringify({ name, email, password });

  // axios
  //   .post('/api/auth/register', body, config)
  //   .then(res =>
  //     dispatch({
  //       type: REGISTER_SUCCESS,
  //       payload: res.data
  //     })
  //   )
  //   .catch(err => {
  //     dispatch(
  //       returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
  //     );
  //     dispatch({
  //       type: REGISTER_FAIL
  //     });
  //   });
};

// Login User
export const login = ({ email, password }: IAuthFunction) => 
async (dispatch: Function) => {
  try {
    dispatch(beginApiCall());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        if (data.user!.emailVerified) {
          console.log("IF", data.user!.emailVerified);
          dispatch({ type: LOGIN_SUCCESS });
        } else {
          console.log("ELSE", data.user!.emailVerified);
          dispatch({
            type: EMAIL_NOT_VERIFIED,
            payload: "You haven't verified your e-mail address."
          });
        }
      })
      .catch(() => {
        dispatch(apiCallError());
        dispatch({
          type: LOGIN_FAIL,
          payload: "Invalid login credentials"
        });
      });
  } catch (err) {
    dispatch(apiCallError());
    dispatch({ type: LOGIN_FAIL, payload: "Invalid login credentials" });
  }
  // // Headers
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // };

  // // Request body
  // const body = JSON.stringify({ email, password });

  // axios
  //   .post('/api/auth/login', body, config)
  //   .then(res =>
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: res.data
  //     })
  //   )
  //   .catch(err => {
  //     dispatch(
  //       returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
  //     );
  //     dispatch({
  //       type: LOGIN_FAIL
  //     });
  //   });
};

// Logout User
export const logout = () => async (dispatch: Function) => {
  // return {
  //   type: LOGOUT_SUCCESS
  // };
  try {
    dispatch(beginApiCall());
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch(() => {
        dispatch(apiCallError());
        dispatch({
          type: LOGOUT_ERROR,
          payload: "Error, we were not able to log you out. Please try again."
        });
      });
  } catch (err) {
    dispatch(apiCallError());
    dispatch({
      type: LOGOUT_ERROR,
      payload: "Error, we were not able to log you out. Please try again."
    });
  }
};

// Reset password with Firebase
export const resetPassword = (email: any) => async (dispatch: Function) => {
  try {
    dispatch(beginApiCall());
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        dispatch({
          type: RESET_SUCCESS,
          payload:
            "Check your inbox. We've sent you a secured reset link by e-mail."
        })
      )
      .catch(() => {
        dispatch(apiCallError());
        dispatch({
          type: RESET_ERROR,
          payload:
            "Oops, something went wrong we couldn't send you the e-mail. Try again and if the error persists, contact admin."
        });
      });
  } catch (err) {
    dispatch(apiCallError());
    dispatch({ type: RESET_ERROR, payload: err });
  }
};

// Setup config/headers and token
export const tokenConfig = (getState: Function) => {
  // Get token from localstorage
  const user = firebase.auth().currentUser
  // const token = getState().auth.token;
  const token = user && (user.getIdToken)

  // // Headers
  // const config: IConfigHeaders = {
  //   headers: {
  //     'Content-type': 'application/json'
  //   }
  // };

  // // If token, add to headers
  // if (token) {
  //   config.headers['x-auth-token'] = token;
  // }
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};






