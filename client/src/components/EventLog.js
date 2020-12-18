// import React, {useState, useEffect} from 'react';
// import Clock from 'react-live-clock';
// import { IonContent, IonItem, IonButton, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonDatetime, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
// import { logArrival } from "../flux/actions/eventActions";
// import {logPoints} from "../flux/actions/authActions";
// import { IEventLogReduxProps, IEventLog } from '../types/interfaces';
// import {connect} from 'react-redux';
// import Countdown from 'react-countdown';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer'
// import {isPast, add, formatISO} from "date-fns";
 
// const EventLog = ({ auth, current, logArrival, logPoints
// }: IEventLog) => {
 
//   const [title, setTitle] = useState('');
//   const [location, setLocation] = useState('');
//   const [dateStart, setDateStart] = useState('');
//   const [dateEnd, setDateEnd] = useState('');
//   const [attendees, setAttendees] = useState('');
//   const [arrivalTime, setArrivalTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [points, setPoints] = useState(auth!.user.points);

// useEffect(() => {
//     if(current) {
//       setTitle(current.title)
//       setLocation(current.location)
//       setDateStart(current.dateStart)
//       setDateEnd(current.dateEnd)
//       setAttendees(attendees)
//       setArrivalTime(current.arrivalTime)
//       setEndTime(current.endTime)
//     }
//   }, [current]);  

//  const handleClick = () => {
//    setArrivalTime(Date());
//    setPoints(String(parseInt(points!)+50));

//   const updatedLog = {
//     _id: current._id,
//     title: current.title,
//     location: current.location,
//     dateStart: current.dateStart,
//     dateEnd: current.dateEnd,
//     attendees: current.attendees,
//     arrivalTime: Date()
//   };
//    // Log event via logArrival action
//   logArrival(updatedLog);
// }

 
//  const handleClickEnd = () => {
//   setEndTime(Date());
//   setPoints(String(parseInt(points!)+50));

//   const updatedLog = {
//     _id: current._id,
//     title: current.title,
//     location: current.location,
//     dateStart: current.dateStart,
//     dateEnd: current.dateEnd,
//     attendees: current.attendees,
//     arrivalTime: current.arrivalTime,
//     endTime: Date()
//   };
//    // Log event via logArrival action
//   logArrival(updatedLog);
// }

//  useEffect(()=>{
//  if(meetStart > arrivedString) {
//   const meetingPoints = {
//   points
// };
// logPoints(meetingPoints)
//  }
// }, [points])
 
// const meetStart = new Date(current.dateStart);
// const arrivedString = new Date(Date.parse(arrivalTime))

// const meetEnd = new Date(current.dateEnd);
// const endString = new Date(Date.parse(endTime)) 
// //make sure this updates "points"

// let arrivalmessage;
// var pointsArrival: any
// var pointsEnd: any

// if(meetStart > arrivedString ){
//   pointsArrival = 50;
//   arrivalmessage = "You have arrived on time!"
// } else if (meetStart < arrivedString ){
//   pointsArrival = 0;
//   arrivalmessage = "You're late!"
// } else {
//   arrivalmessage = "You have not logged this event."
// }
// //ADD arrivedTime + endTime POINTS
// if(meetEnd > endString ){
//   pointsEnd = 50;
// } else {
//   pointsEnd = 0;
// } 
// var pointsTotal = pointsArrival+pointsEnd;


// if(current.isOrganizer) {
//       var logEndButtom = false;
//     }
//   else{
//     var logEndButtom = true;
//   }

// var dateEndPlus = add(new Date(current.dateEnd), {
//   hours: 1
// })

//   return(
//       <IonPage>
//         <IonHeader>
//           <IonToolbar>
//             <IonButtons slot="start">
//               <IonBackButton defaultHref="/"/>
//             </IonButtons>
//             <IonTitle className="ion-text-center">
//             Log
//             </IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent>
//           <IonItem>
//             {/* <IonLabel>
//               Time now
//             </IonLabel> */}
//             <Countdown date={current.dateStart}>
//             <span>Time is up!</span>
//             </Countdown>
//           </IonItem>
//         <IonItem>
//         {current.title}
//         <br/>
//         {current.location}      
//         </IonItem>
//         <IonItem>
//           <IonLabel>
//             Scheduled Time: 
//           </IonLabel>
//           <IonDatetime value={current.dateStart} readonly displayFormat="MMM DD, h:mm A" ></IonDatetime>
//           <IonDatetime value={current.dateEnd} readonly displayFormat="h:mm A" ></IonDatetime>
//         </IonItem>
//         <IonItem>
//           <IonLabel>
//             You
//           </IonLabel>
//           <IonDatetime 
//           placeholder={arrivalTime}
//           value={arrivalTime} 
//           readonly 
//           displayFormat="MMM DD, h:mm A" 
//           // onIonChange={e => setArrivalTime(e.detail.value!)}
//           ></IonDatetime>
//         </IonItem>
//         <IonItem>
//           <IonLabel>
//           <div className="ion-text-center">
//           {arrivalmessage}
//           </div>
//           </IonLabel>
//         </IonItem>
//         {/* </form>  */}
//           <IonButton 
//           type="submit"
//           expand="block"
//           onClick={handleClick}
//           disabled={
//             arrivalTime? true : false || 
//             isPast(new Date(current.dateEnd))
//           }
//           >Log</IonButton>
//           {/* Buttom for organizer */}
//           <IonButton 
//           type="submit"
//           expand="block"
//           onClick={handleClickEnd}
//           hidden={logEndButtom}
//           disabled={
//             // arrivalTime? true : false && 
//             endTime? true : false || 
//             isPast(dateEndPlus) 
//           }
//           >Log End</IonButton>
//           <IonItem>
//             <IonLabel>
//               Points earned: {pointsTotal}
//             </IonLabel>
//           </IonItem>
//         {/* </form> */}
//       </IonContent>
//       </IonPage>
//   );
// };

// const mapStateToProps = (state: IEventLogReduxProps) => ({
//   current: state.event.current,
//   auth: state.auth
// });

// export default connect(mapStateToProps, {logArrival, logPoints})(EventLog);