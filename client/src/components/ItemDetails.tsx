import React, {useState, useEffect} from 'react';
import { IonContent, IonItem, IonButton, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonDatetime, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardContent, IonText, IonCardSubtitle, IonCardTitle, IonGrid, IonCol, IonIcon, IonRow } from '@ionic/react';
import {logPoints} from "../flux/actions/authActions";
import { IItemDetailReduxProps, IItemDetails } from '../types/interfaces';
import {connect} from 'react-redux';
import { addPurchases } from '../flux/actions/purchaseActions';
 
const ItemDetails = ({ auth, currentItem, logPoints, addPurchases
}: IItemDetails) => {
 
  const [name, setName] = useState('');
  const [pointsItem, setPointsItem] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(auth!.user.points);

useEffect(() => {
    if(currentItem) {
      setName(currentItem.name)
      setPointsItem(currentItem.pointsItem)
      setDescription(currentItem.description)
    }
  }, [currentItem]);  

 const handleClick = () => {
   setPoints(String(parseInt(points!)-parseInt(currentItem.pointsItem)));

   const newPurchase = {
     name: currentItem.name,
     pointsItem: currentItem.pointsItem
   }
   addPurchases(newPurchase)
 }
 useEffect(()=>{
  const something = {
    points
  }
  logPoints(something);
 }, [points])


//Set button visibility based on user.points
if(auth!.user.points! > currentItem.pointsItem)
    {
      var redeemButton = false;
    }
  else{
    var redeemButton = true;
  }

  return(
    <IonPage>
      <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton/>
                </IonButtons>
              <IonTitle>
                <div className="ion-text-center">
                {points}
                </div>
              </IonTitle>
            </IonToolbar>
            </IonHeader>
      <IonContent>
        <IonCard class="action-card">
          {/* <img class="header-img" src="/assets/card-top-img.png" /> */}
          <IonCardHeader>
            <IonCardSubtitle>{currentItem.pointsItem}</IonCardSubtitle>
            <IonCardTitle>{currentItem.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          {currentItem.description}  
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton 
                    size="small" 
                    expand="full"
                    onClick = {handleClick} 
                    disabled={redeemButton}
                  >Redeem</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
  </IonPage>
  );
};

const mapStateToProps = (state: IItemDetailReduxProps) => ({
  currentItem: state.item.currentItem,
  auth: state.auth
});

export default connect(mapStateToProps, {logPoints, addPurchases})(ItemDetails);
