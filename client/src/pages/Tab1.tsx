import React, { useEffect, useState } from 'react';
import { IonHeader, IonPage, IonTitle, IonModal, IonToolbar, IonIcon, IonContent, IonButtons, IonButton, IonBadge, IonMenuButton } from '@ionic/react';
import './Tab1.css';
import Calendar from '../components/Calendar';
// import EventAdd from '../components/EventAdd';
import { add, fileTrayFullOutline } from 'ionicons/icons';
import { IInviteModal } from "../types/interfaces";
import { connect } from 'react-redux';
import EventAdd from '../components/EventAdd';


const Tab1 = ({ onDismissModal}: IInviteModal) => {

  const [showEventModal, setShowEventModal] = useState(false);

  // useEffect(() => { 
  //   getInvites(); 
  // }, [getInvites]);

  // const { invites } = invite;
  // const inviteCount = invites.length
;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <Calendar />
          <IonModal
          isOpen={showEventModal}
          onDidDismiss={() => setShowEventModal(false)}
          swipeToClose={true}
          cssClass="session-list-filter"
          >
            <EventAdd
              onDismissModal={() => setShowEventModal(false)}
            />
          </IonModal>
          
      </IonContent>
    </IonPage>
  );
};


export default connect(null) (Tab1);