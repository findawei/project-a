import React from 'react';
import { IonPage } from '@ionic/react';
import Leaderboard from '../components/Leaderboard';


const Tab2 = () => {
 
//make upcoming event display on the page, but make it disabled until 15mins before the event time. 

  return(
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle><div className="ion-text-center">
          Log
          </div></IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <Leaderboard />
    </IonPage>
  );
};

// const mapStateToProps = (state: IEventReduxProps) => ({
//   event: state.event
// });

export default Tab2;

