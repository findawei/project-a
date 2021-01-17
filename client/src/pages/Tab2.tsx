import React from 'react';
import { IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Leaderboard from '../components/Leaderboard';


const Tab2 = () => {
 
//make upcoming event display on the page, but make it disabled until 15mins before the event time. 

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Leaderboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Leaderboard />
    </IonPage>
  );
};

// const mapStateToProps = (state: IEventReduxProps) => ({
//   event: state.event
// });

export default Tab2;

