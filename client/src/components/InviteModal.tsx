import React, { useEffect } from "react";
import { IonContent, IonButton, IonButtons, IonToolbar, IonTitle, IonHeader,  IonList, IonPage } from "@ionic/react";
import { IInviteModal, IInviteReduxProps } from "../types/interfaces";
import { connect } from "react-redux";
import {getInvites} from '../flux/actions/inviteActions';
import InviteListItem from "./InviteListItem";
import { getEvents } from "../flux/actions/eventActions";

const InviteModal = ({ getInvites, getEvents, invite, onDismissModal}: IInviteModal) => {
  
  useEffect(() => { 
    getInvites(); 
  }, [getInvites]);

  const onButtonClick = () => {
    onDismissModal();
    getEvents();
  }

  const { invites } = invite;
    
  return (
    <IonPage>
        <IonContent>
              <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                    <IonButton 
                    onClick={onButtonClick}
                    >
                        Back
                    </IonButton>
                </IonButtons>
              <IonTitle>
                <div className="ion-text-center">
                Event Invites
                </div>
              </IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonList>
                {
                invites.map(invite => <InviteListItem 
                invite={invite}
                key={invite._id}
                />
                )}
            </IonList>
          </IonContent>
          </IonPage>
  );
};

const mapStateToProps = (state: IInviteReduxProps) => ({
  invite: state.invite
});

export default connect(mapStateToProps, { getInvites, getEvents })(InviteModal);