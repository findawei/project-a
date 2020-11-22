import React, { useState, useEffect } from "react";
import { IonContent, IonItem, IonInput, IonButton, IonItemDivider, IonLabel, IonDatetime, IonButtons, IonToolbar, IonTitle, IonHeader, IonToast, IonIcon, IonList } from "@ionic/react";
import {addEvent} from '../flux/actions/eventActions';
import { clearErrors } from '../flux/actions/errorActions';
import {connect} from 'react-redux';
import {IEventReduxProps, IEventAdd} from '../types/interfaces';
import {addMinutes, roundToNearestMinutes} from "date-fns";
import { useForm, Controller, useFieldArray } from "react-hook-form";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { closeCircle } from "ionicons/icons";

const EventAdd = ({addEvent, error, clearErrors, onDismissModal}: IEventAdd) => {
  //For dateStart Placeholder
  var b = roundToNearestMinutes(new Date(), { nearestTo: 5 });
  var c = b.toString();
  //For dateEnd Placeholder
  var d = roundToNearestMinutes(addMinutes(b, 30), { nearestTo: 5 }).toString()
  

  let initialValues = {
    title: "",
    location: "",
    dateStart: c,
    dateEnd: d,
    attendees: [{name: "", email: ""}]
  };

  // let startD = dateStart;
  // var endD = dateEnd;

  // var dateInPast = isBefore(new Date(startD), new Date(endD));
  //     if (!dateInPast){
  //       var dateColor="danger";
  //     }
  //     else{
  //       dateColor="";
  //     };

  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  });

  const [newEvent, setNewEvent] = useState();
  const [msg, setMsg] = useState('');
  const [showToast2, setShowToast2] = useState(false);

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
  const onSubmit = (newEvent: any) => {
    setNewEvent(newEvent)
    addEvent(newEvent);
    onDismissModal();
  };


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
 

const { fields, append, remove } = useFieldArray(
  {
    control,
    name: "attendees"
  }
);

const [selectedDate, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');

  return (      
      <IonContent>
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
          <form onSubmit={handleSubmit(onSubmit)}>
              <IonHeader>
              <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={onDismissModal}>
                    Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>
                <div className="ion-text-center">
                New Event
                </div>
              </IonTitle>
              <IonButtons slot="end">
                <IonButton type="submit" disabled={formState.isValid === false}>
                    Add
                </IonButton>
              </IonButtons>
            </IonToolbar>
            </IonHeader>
            <IonItem>
              <Controller
                as={IonInput}
                placeholder="Title"
                control={control}
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
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("dateStart", selected.detail.value);
                  return selected.detail.value;
                }}
                name="dateStart"
                displayFormat="MMM DD, h:mm A" 
                minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"
                rules={{
                  required: true
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
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("dateEnd", selected.detail.value);
                  return selected.detail.value;
                }}
                name="dateEnd"
                // min="dec"
                displayFormat="MMM DD, h:mm A" 
                minuteValues="0,5,10,15,20,25,30,35,40,45,50,55"
                // min={(new Date()}
                rules={{
                  required: true,
                }}
              />
            </IonItem>
            {showError("dateEnd")}

            <IonItemDivider color="light"></IonItemDivider>

            <IonList>
        {fields.map((item, index) => {
          return (
            <IonItem key={item.id}>
              <Controller
                as={IonInput}
                placeholder={"Invitee name"}
                control={control}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("attendees.name", selected.detail.value);
                  return selected.detail.value;
                }}
                name={`attendees[${index}].name`}                
                rules={{
                  required: true
                }}
              />
              {showError("attendees.name")}
              <Controller
                as={IonInput}
                placeholder={"Invitee email"}
                control={control}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  // console.log("attendees.email", selected.detail.value);
                  return selected.detail.value;
                }}
                name={`attendees[${index}].email`}
                rules={{
                  required: true
                }}
              />
              {showError("attendees.email")}
              <IonIcon 
                    icon={closeCircle} 
                    slot="end"
                    className="remove-btn"
                    // color="danger"
                    onClick={() => remove(index)}
                    />
              </IonItem>
          );
        })}
      </IonList>
        <IonButton
          type="button"
          onClick={() => {
            append({});
          }}
        >
          Add
        </IonButton>
          </form>
        </IonContent>
  );
};

const mapStateToProps = (state: IEventReduxProps) => ({
    event: state.event,
    error: state.error
  });

export default connect(mapStateToProps, {addEvent, clearErrors})(EventAdd);