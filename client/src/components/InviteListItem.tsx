import React, { useState } from 'react';
import {  IonItem, IonLabel, IonButton, IonGrid, IonRow, IonCol, IonItemDivider } from '@ionic/react';
import {connect} from 'react-redux';
import {addInvite, declineInvite, setCurrentInvite} from '../flux/actions/inviteActions';
import { IInviteListItem, IInviteListReduxProps } from '../types/interfaces';
import {format} from "date-fns";
 
const InviteListItem = ({ invite, addInvite, declineInvite, setCurrentInvite }: IInviteListItem) => {

  const setCurrent = (invite: any) => {setCurrentInvite(invite)};
  const handleAddInvite = (_id: string) => {addInvite(invite);};
  const handleDeclineInvite = (_id: string) => {declineInvite(invite);};


  return (
              <IonItem
              onClick={() => setCurrent(invite)}
              >
                <IonLabel>
                <h2>{invite.title}</h2>
                <p>From: {invite.organizer.name}</p>
                <p>{invite.location}</p>
                <p>{format(new Date(invite.dateStart), "MMM d', 'h:mm aaa")}&mdash;&nbsp;
                  {format(new Date(invite.dateEnd), "h:mm aaa")}</p>
                  {invite.attendees!.map((attendee, _id)=> (
                  <p key={attendee._id} >
                    {attendee.email}
                    {attendee.status}
                  </p>))}
                  <div className="ion-text-center">
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton 
                      size="small" 
                      fill="clear"
                      onClick={() => handleAddInvite(invite._id)}
                      >
                      Accept
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton size="small" fill="clear">
                      _
                      </IonButton>
                    </IonCol>
                    <IonCol>
                      <IonButton 
                      size="small" 
                      fill="clear"
                      onClick={() => handleDeclineInvite(invite._id)}
                      >
                      Decline
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                </div>
                </IonLabel>
              </IonItem>
             
  );
};

// const mapStateToProps = (state: IInviteListReduxProps) => 
// ({
//   currentInvite: state.invite.currentInvite
// })

export default connect(null, {addInvite, declineInvite, setCurrentInvite})(InviteListItem);
