import React, { useState, useEffect } from 'react';
import { IonItemDivider, IonPage, IonTitle, IonItem, IonLabel, IonDatetime, IonButton, IonInput, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonList, IonIcon, IonToast, IonSelect, IonSelectOption, IonCol, IonGrid, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import { updateEvent } from "../flux/actions/eventActions";
import { IEventEditReduxProps, IEventEdit } from '../types/interfaces';
import {connect} from 'react-redux';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { checkmarkCircle, closeCircle, helpCircleOutline } from 'ionicons/icons';

//make upcoming event display on the page, but make it disabled until 15mins before the event time.

const EventEdit = ({ auth, current, updateEvent, error, clearErrors }:IEventEdit) => {

  let initialValues = {
    _id: current._id,
    title: current.title,
    location: current.location,
    dateStart: current.dateStart,
    dateEnd: current.dateEnd,
    attendees: current.attendees,
    isOrganizer: current.isOrganizer
  }

  const [updatedEvent, setUpdatedEvent] = useState();
  const [msg, setMsg] = useState('');
  const [showToast2, setShowToast2] = useState(false);

//Can edit? If isOrganizer = TRUE
let canEdit: any
if (current.isOrganizer) {
  canEdit = false;
} else {
  canEdit = true;
}

let isOwner: any
if (current.isOrganizer) {
  isOwner = true;
} else {
  isOwner = false;
}

let isUser: any
if (auth?.user.email) {
  isUser = true;
} else {
  isUser = false;
}
  // useEffect(() => {
  //   if (current) {
  //     setUpdatedEvent(current);
  //   }
  // }, [current]);
  useEffect(() => {
    // Check for event add error
    if (error.id === 'EVENT_ERROR') {
      setMsg(error.msg.msg);
      setShowToast2(true)
    }
       // If event saved, close modal
    // if (modal) {
    //   if (setMsg = null) {
    //       handleToggle();
    //     }
    //   }
  }, [error, msg]);
  
    

    const { control, handleSubmit, formState, reset, errors } = useForm({
      defaultValues: { ...initialValues },
      mode: "onChange"
    });

  /**
   *
   * @param _fieldName
   */
  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };

  /**
   *
   * @param data
   */

    const onSubmit = (updatedEvent: any) => {
      setUpdatedEvent(updatedEvent)
      updateEvent(updatedEvent);
      // Clear Fields
      // setTitle('');
   
    };

    const { fields, append, remove } = useFieldArray(
      {
        control,
        name: "attendees"
      }
    );
    
  return(
    <IonPage>
      <IonContent>
      <form onSubmit={handleSubmit(onSubmit)}>
      <IonToast 
              position="top"
              isOpen={showToast2} 
              onDidDismiss={() => setShowToast2(false)} 
              message={msg}
              buttons={[
                {
                  text: 'Done',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]}
              />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Cancel" icon=""/>
          </IonButtons>
          <IonTitle>
          <div className="ion-text-center">
          Edit Event
          </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton type="submit" routerLink={"/tab1"} >
              Done
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
     
             <IonItem
             hidden
             >
              <Controller
                as={IonInput}
                placeholder="_id"
                control={control}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  return selected.detail.value;
                }}
                name="_id"

              />
            </IonItem>


            <IonItem>
              <Controller
                as={IonInput}
                placeholder="Title"
                control={control}
                disabled={canEdit}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("title", selected.detail.value);
                  return selected.detail.value;
                }}
                name="title"
                rules={{
                  required: true,
                  minLength: 
                  { value: 4, message: "Must be 4 chars long" }
                }}
              />
            </IonItem>
            {showError("title")}
            
            <IonItem>
              <Controller
                as={IonInput}
                placeholder="Location"
                control={control}
                disabled={canEdit}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("location", selected.detail.value);
                  return selected.detail.value;
                }}
                name="location"
                rules={{
                  required: false
                  // minLength: { value: 4, message: "Must be 4 chars long" }
                }}
              />
            </IonItem>
            {showError("location")}

            <IonItemDivider color="light"></IonItemDivider>

            <IonItem>
            <IonLabel>Starts</IonLabel>
              <Controller
                as={IonDatetime}
                control={control}
                disabled={canEdit}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("dateStart", selected.detail.value);
                  return selected.detail.value;
                }}
                name="dateStart"
                displayFormat="MMM DD, h:mm A" 
                minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"
                rules={{
                  required: false
                  // minLength: { value: 4, message: "Must be 4 chars long" }
                }}
              />
            </IonItem>
            {showError("dateStart")}
            <IonItem>
            <IonLabel>Ends</IonLabel>
              <Controller
                as={IonDatetime}
                placeholder="dateEnd"
                control={control}
                disabled={canEdit}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("dateEnd", selected.detail.value);
                  return selected.detail.value;
                }}
                name="dateEnd"
                displayFormat="MMM DD, h:mm A" 
                minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"
                rules={{
                  required: false
                }}
              />
            </IonItem>
            {showError("dateEnd")}

            <IonItemDivider color="light"></IonItemDivider>

            <IonList>
        {fields.map((item, index) => {
          return (
            <IonItem key={item.id}>
                  <IonIcon
                      icon={checkmarkCircle}
                      color="success"
                      hidden = {`attendees[${index}].status` == "accepted"? false : true}
                    />
                    <IonIcon
                      icon={closeCircle}
                      color="danger"
                      hidden = {
                        `attendees[${index}].status` == "declined"? false : true  
                      }
                    />

              <Controller
                as={
                  // <IonIcon
                  //     icon={checkmarkCircle}
                  //     color="success"
                  //     hidden = {`attendees[${index}].status` == "accepted"? false : true}
                  //     // placeholder = {"attendees[${index}].status"}
                  //   />
                  // <div>
                    
                  // </div>
                  <IonSelect interface="popover" placeholder="attendees[${index}].status" 
                  disabled = {true}
                  >
                  <IonSelectOption value="accepted">Accepted</IonSelectOption>
                  <IonSelectOption value="declined">Declined</IonSelectOption>
                </IonSelect>
                }
                control={control}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("attendees.name", selected.detail.value);
                  return selected.detail.value;
                }}
                name={`attendees[${index}].status`}                
                rules={{
                  // required: true
                }}
              />
              <Controller
                as={IonInput}
                placeholder={"Invitee name"}
                control={control}
                disabled={canEdit}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("attendees.name", selected.detail.value);
                  return selected.detail.value;
                }}
                name={`attendees[${index}].name`}                
                rules={{
                  // required: true
                }}
              />
              {showError("attendees.name")}
              <Controller
                as={IonInput}
                placeholder={"Invitee email"}
                control={control}
                disabled={canEdit}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("attendees.email", selected.detail.value);
                  return selected.detail.value;
                }}
                name={`attendees[${index}].email`}
                rules={{
                  // required: true
                }}
              />
              {showError("attendees.email")}
              <IonButton                     
              onClick={() => remove(index)}
              disabled={canEdit}
              fill="clear"
              >
                <IonIcon 
                    icon={closeCircle} 
                    slot="end"
                    className="remove-btn"
                    // color="danger"
                    />
              </IonButton>
              
              </IonItem>
          );
        })}
      </IonList>
        <IonButton
          type="button"
          onClick={() => {
            append({});
          }}
          disabled={canEdit}
        >
          Add
        </IonButton>
            
          </form>
         
          {current.attendees.map((attendee, _id)=> (
                  <p key={attendee._id} >
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
                  </p>
                  )
                  )}
                   <div hidden={isOwner}>
          
          </div>
        
          </IonContent>
    </IonPage>
  );
};


const mapStateToProps = (state: IEventEditReduxProps) => ({
  current: state.event.current,
  error: state.error,
  auth: state.auth

});


export default connect(mapStateToProps, {updateEvent})(EventEdit);
