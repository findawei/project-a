import React, { useEffect, useState } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import {connect} from 'react-redux';
import {getEvents} from '../flux/actions/eventActions';
import { IEventReduxProps, ICalendar } from '../types/interfaces';
import EventListItem from './EventListItem';
import { accessToken } from '../flux/actions/authActions';
import { graphConfig } from '../graphConfig';
import { getUserWeekCalendar } from '../GraphService';
import moment, { Moment } from 'moment';
// import { Event } from '@microsoft/microsoft-graph-types';



const Calendar = ({ getEvents, event }: ICalendar) => {

  useEffect(() => { 
    
    if(accessToken){
      getEvents()
    }
  }, [getEvents]);
  
//  useEffect(()=>{
//    RequestProfileData();
//  },[])

  
// function RequestProfileData() {
//       callMsGraph(graphConfig.graphCalendarEndpoint, accessToken, range)
//         .then(e => setGraphData(e));    
// }

const { events } = event;

  return (
    <IonContent>
      <IonList>
        <div>
        {accessToken ? events.map(event => <EventListItem 
          event={event} 
          key={event.iCalUId}
          />
          ) :
          <p>Didn't connect to Graph</p>
          }
          </div>
      </IonList>
    </IonContent>
  );
};

const mapStateToProps = (state: IEventReduxProps) => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvents })(Calendar);