import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase } from "react-redux-firebase";
import firebase from "../firebase";


const initialState = {};

const middleWare = [thunk];

  // 1. Enhancing our createStore method with Firebase
//@ts-ignore
const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(createStore);
// 2. Creating our store with this newly enhanced store creator
const store = createStoreWithFirebase(
  rootReducer,
  initialState, composeWithDevTools
  (
  applyMiddleware(...middleWare))
  );

export default store;

