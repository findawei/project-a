import React, { useEffect, useState } from 'react';
import { IonHeader, IonPage, IonTitle, IonModal, IonToolbar, IonIcon, IonContent, IonButtons, IonButton, IonBadge } from '@ionic/react';
import './Tab1.css';
import Calendar from '../components/Calendar';
import EventAdd from '../components/EventAdd';
import { add, fileTrayFullOutline } from 'ionicons/icons';
import InviteModal from '../components/InviteModal';
import { getInvites } from '../flux/actions/inviteActions';
import { IInviteModal, IInviteReduxProps } from "../types/interfaces";
import { connect } from 'react-redux';


const Tab1 = ({getInvites, invite, onDismissModal}: IInviteModal) => {

  const [showEventModal, setShowEventModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => { 
    getInvites(); 
  }, [getInvites]);

  const { invites } = invite;
  const inviteCount = invites.length
;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => setShowEventModal(true)}>
            <IonIcon slot="icon-only" icon={add}  />
          </IonButton>
        </IonButtons>            
          <IonTitle>
          <div className="ion-text-center">
          Events
          </div>
          </IonTitle> 
          <IonButtons slot="end">
          <IonButton 
          onClick={() => setShowInviteModal(true)}>
            <IonIcon icon={fileTrayFullOutline}/>
            <IonBadge>{inviteCount}</IonBadge>
          </IonButton>
        </IonButtons>       
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
          <IonModal
          isOpen={showInviteModal}
          onDidDismiss={() => setShowInviteModal(false)}
          swipeToClose={true}
          cssClass="session-list-filter"
          >
            <InviteModal
              onDismissModal={() => setShowInviteModal(false)}
            />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: IInviteReduxProps) => ({
  invite: state.invite
});

export default connect(mapStateToProps, { getInvites }) (Tab1);