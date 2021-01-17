import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import './Tab4.css';
import ItemStore from '../components/ItemStore';

const Tab4 = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Redeem</IonTitle>
        </IonToolbar>
      </IonHeader>
        <ItemStore/>
    </IonPage>
  );
};

export default Tab4;



