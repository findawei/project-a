import React, {useEffect} from 'react';
import {
  IonApp
} from '@ionic/react';
import { Provider } from 'react-redux';
import store from './flux/store';

import { loadUser } from './flux/actions/authActions';
import Landing from './pages/Landing';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';



const App = () => {
 
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);
  
return(
  <Provider store={store}>
    <IonApp>
      <Landing />
    </IonApp>
  </Provider>
  );
};

export default App;
