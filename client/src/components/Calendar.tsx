import React, { useEffect } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import {connect} from 'react-redux';
import {getEvents} from '../flux/actions/eventActions';
import { IEventReduxProps, ICalendar } from '../types/interfaces';
import EventListItem from './EventListItem';
import {isFuture, isPast} from "date-fns";


const Calendar = ({ getEvents, event }: ICalendar) => {

  useEffect(() => { 
    getEvents(); 
  }, [getEvents]);
 
  const { events } = event;

  return (
    <IonContent>
      <IonList>
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
      </IonList>
      {/* <IonLabel>
       <h1>Meetings Attended</h1> 
      </IonLabel> */}
      {/* <IonList>
        {events.filter().map(event => <EventListItem 
          event={event} 
          key={event._id}
          />
          )}
      </IonList> */}
    </IonContent>
  );
};

const mapStateToProps = (state: IEventReduxProps) => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvents })(Calendar);