import React, { useState } from 'react';
import {  IonItem, IonLabel, IonButton, IonGrid, IonRow, IonCol, IonItemDivider } from '@ionic/react';
import {connect} from 'react-redux';
import { IPurchaseListItem } from '../types/interfaces';
import {format} from "date-fns";
 
const PurchaseListItem = ({ purchase }: IPurchaseListItem) => {


  return (
              <IonItem
              >
                <IonLabel>
                <h2>{purchase.name}</h2>
                <p>{purchase.pointsItem}</p>
                <p>{format(new Date(purchase.date), "Y MMM d', 'h:mm aaa")}</p>
                </IonLabel>
              </IonItem>
             
  );
};

export default connect(null)(PurchaseListItem);
