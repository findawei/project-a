import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import './Tab4.css';
import Logout from '../components/auth/Logout';

const Tab3 = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent> 
      <Logout />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;



