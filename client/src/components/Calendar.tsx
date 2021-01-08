import React, { useEffect, useState } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import {connect} from 'react-redux';
import {getEvents} from '../flux/actions/eventActions';
import { IEventReduxProps, ICalendar } from '../types/interfaces';
import EventListItem from './EventListItem';
import { callMsGraph, ProfileData } from '../graph';
import { accessToken } from '../flux/actions/authActions';

const Calendar = ({ getEvents, event }: ICalendar) => {

  useEffect(() => { 
    getEvents();
  }, [getEvents]);
  
 useEffect(()=>{
   RequestProfileData();
 },[])

const [graphData, setGraphData] = useState(null);

function RequestProfileData() {
      callMsGraph(accessToken)
        .then(e => setGraphData(e));
}

const { events } = event;


  return (
    <IonContent>
 
      {/* <IonList>
        <IonListHeader lines="full">
          <IonLabel color="primary">
            <h2>Upcoming</h2>
            </IonLabel>
        </IonListHeader>
          {events.filter(opt => isFuture(new Date(opt.dateStart))).map(event => <EventListItem 
          event={event} 
          key={event._id}/>
          )
          }
      </IonList>
      <IonList>
        <IonListHeader lines="full">
          <IonLabel>
            <h2>Past</h2>
            </IonLabel>
        </IonListHeader>  
          {events.filter(opt => isPast(new Date(opt.dateStart))).map(event => <EventListItem 
          event={event} 
          key={event._id}/>
          )
          }
      </IonList> */}
      {/* <IonLabel>
       <h1>Meetings Attended</h1> 
      </IonLabel> */}
      {graphData ? 
                <ProfileData graphData={graphData} />
                :
      <p>Didn't connect to Graph</p>}


      <IonList>
        {events.map(event => <EventListItem 
          event={event} 
          key={event._id}
          />
          )}
      </IonList>
    </IonContent>
  );
};

const mapStateToProps = (state: IEventReduxProps) => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvents })(Calendar);