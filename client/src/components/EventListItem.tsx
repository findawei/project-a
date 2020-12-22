import React from 'react';
import {  IonCheckbox, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import {connect} from 'react-redux';
import {deleteEvent, setCurrent} from '../flux/actions/eventActions';
import { IEventListItem } from '../types/interfaces';
import { checkmarkCircle, closeCircle, helpBuoyOutline, helpCircleOutline } from 'ionicons/icons';
import {format} from "date-fns";

const EventListItem = ({ event, deleteEvent, setCurrent }: IEventListItem) => {

  const handleDelete = (_id: string) => {deleteEvent(_id);};
  const setCurrentEvent = (event: any) => {setCurrent(event);};

  return (
          <div>          
              <IonItem  
              onClick={() => setCurrentEvent(event)}
              // routerLink={`/event/${event._id}`}          
              >
                <IonLabel>
                <h2>{event.title}</h2>
                <p>{event.location}</p>
                <p>{format(new Date(event.dateStart), "MMM d', 'h:mm aaa")}&mdash;&nbsp;
                  {format(new Date(event.dateEnd), "MMM d', 'h:mm aaa")}</p>
                  <div>
                  {event.isOrganizer? "" :
                  <div>
                  <IonIcon
                      icon={checkmarkCircle}
                      color="success"
                      hidden = {event.organizer?.email? false : true}
                    />
                    {event.organizer?.email} (organizer)
                    </div>
                    }
                  </div>
                  {/* MAP the ATTENDEES */}
                  {event.attendees.map((attendee, _id)=> (
                  <div key={attendee._id} >
                     <IonIcon
                      icon={checkmarkCircle}
                      color="success"
                      hidden = {attendee.status == "accepted"? false : true}
                    />
                    <IonIcon
                      icon={closeCircle}
                      color="danger"
                      hidden = {
                        attendee.status == "declined"? false : true  
                      }
                    />
                    <IonIcon
                      icon={helpCircleOutline}
                      // color="danger"
                      hidden = {
                        attendee.status? true : false  
                      }
                    />
                    {attendee.email}
                  </div>
                  )
                  )}
                </IonLabel>
                <IonButton
                routerLink={`/event/log/${event._id}`}
                color="success"
                fill="clear"
                >Log</IonButton>
                
                <IonButton
                routerLink={`/event/${event._id}`}
                fill="clear"
                >Edit</IonButton>
                <IonIcon 
                    icon={closeCircle} 
                    slot="end"
                    className="remove-btn"
                    color="danger"
                    onClick={() => handleDelete(event._id)}
                    />
              </IonItem>
        </div>      
  );
};



export default connect(null, { deleteEvent, setCurrent })(EventListItem);