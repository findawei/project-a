import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../flux/actions/authActions';
import { IAuthReduxProps, ILogoutProps } from '../../types/interfaces';
import { IonContent, IonButton, IonLabel, IonItem, IonIcon, IonToggle } from '@ionic/react';
import { moon } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';


export const Logout = ({ logout }: ILogoutProps) => {

  let history = useHistory();
  

const logoutButton = () => {
  logout();
  history.push('/tab1/');
}

  return (
    <IonContent>
      <IonItem lines="full">
        <IonIcon slot="start" icon={moon}></IonIcon>
          <IonLabel>
            Toggle Dark Theme
          </IonLabel>
          <IonToggle id="themeToggle" slot="end"></IonToggle>
      </IonItem>
      <IonButton 
        onClick={logoutButton} expand="block"
      >
        Logout
      </IonButton>
    </IonContent>
  );
};


export default connect( null, { logout })(Logout);