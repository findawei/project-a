import React, { useEffect } from 'react';
import { IonContent, IonItem, IonList, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonTitle, IonGrid, IonRow, IonCol, IonText, IonDatetime, IonButton, IonRoute } from '@ionic/react';
import { IEventReduxProps, ILeaderBoard } from '../types/interfaces';
import { connect } from 'react-redux';
import {getEvents} from '../flux/actions/eventActions';

import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/typography.css';
import ItemStore from './ItemStore';
import PurchaseHistory from './PurchaseHistory';

const Leaderboard = ({ auth, getEvents, event }:ILeaderBoard) => {
 
// Time saved
// Count of events on time
// Count of events late
useEffect(() => { 
    getEvents(); 
  }, [getEvents]);
 
  const { events } = event;
  //Number of meetings logged
  const logged = events
    .filter(event => event.arrivalTime != null)
  const numLogged = logged.length
    
  //# of times arrived on time
  const onTime = events
  .filter(event => event.arrivalTime < event.dateStart)
  const numOnTime = onTime.length
  //% on time
  var perOnTime = Math.round((numOnTime/numLogged)*100)
  if (isNaN(perOnTime)) {
      var perOnTimeVal = 0
  } else {
      var perOnTimeVal = perOnTime
  }

  return(
      <IonContent>
        <IonCard>
            <IonCardHeader>
            <IonCardTitle>
                Hi {auth!.user.name} 
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

                <IonGrid>
                <div className="ion-text-center">
                <IonRow>
                    <IonCol>
                        <IonLabel>
                        <h1>
                        {perOnTimeVal}%
                        </h1>
                        On Time 
                        </IonLabel>
                    </IonCol>
                    <IonCol>
                        <IonLabel>
                        <h1>
                        {numLogged}
                        </h1>
                        Meetings Attended
                        </IonLabel>
                    </IonCol>
                    <IonCol>
                        <h1>
                        <IonText color="success">
                        {auth!.user.points}
                        </IonText>
                        </h1>
                        Points Earned
                    </IonCol>
                </IonRow>
                </div>

                </IonGrid>
            </IonCardContent>
        </IonCard>
        <IonTitle>
            Meetings logged
        </IonTitle>
        
        <IonList>
            <IonItem>
                <IonGrid>
            <IonRow>
                <IonCol>
                <h6>Title</h6>
                </IonCol>
                <IonCol>
                <h6>Meeting Start</h6>
                </IonCol>
                <IonCol>
                <h6>Your Arrival Time</h6>
                </IonCol>
                
            </IonRow>
            </IonGrid>
            </IonItem>
          {events.filter(opt => opt.arrivalTime).map(({_id, title, dateStart, arrivalTime}) =>  
          <IonItem key={_id}>
                <IonGrid>
                    <IonRow>
                        <IonCol class="ion-padding-vertical">
                            {title}
                        </IonCol>
                        <IonCol>
                            <IonDatetime value={dateStart} readonly displayFormat="MMM DD, h:mm A" >
                            </IonDatetime>
                        </IonCol>
                        <IonCol>
                            <IonDatetime value={arrivalTime} readonly displayFormat="h:mm A" >
                            </IonDatetime>
                        </IonCol>
                    </IonRow>
                </IonGrid>
          </IonItem>
          )}
      </IonList>
        <IonTitle>
            Purchase History
        </IonTitle>
        <PurchaseHistory />
      </IonContent>
  );
};

const mapStateToProps = (state: IEventReduxProps) => ({
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps, { getEvents })(Leaderboard);