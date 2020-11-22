import React, { useState } from 'react';
import {  IonItem, IonIcon, IonLabel, IonButton, IonCard, IonCol, IonBadge, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonModal } from '@ionic/react';
import {connect} from 'react-redux';
import {deleteItem, setCurrentItem} from '../flux/actions/itemActions';
import { IItemListItem, IItemReduxProps } from '../types/interfaces';
import { closeCircle } from 'ionicons/icons';
import ItemDetails from './ItemDetails';

const ItemListItem = ({ item, auth, setCurrentItem, deleteItem }: IItemListItem) => {

  const handleDelete = (_id: string) => {deleteItem(_id);};
  const setCurrent = (item: any) => {setCurrentItem(item);};

  function ItemView(){
    setCurrent(item);
  }

if(auth!.user.points! > item.pointsItem)
    {
      var pointsBadgeColor = "primary";
    }
  else{
    var pointsBadgeColor = "light";
  }



  return (
    <IonCol size="6" >
        <IonCard 
        onClick={ItemView}
        routerLink={`/item/${item._id}`}
        >
          <IonCardHeader>
                <IonBadge color={pointsBadgeColor}>
                {item.pointsItem}
                </IonBadge>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
            <IonCardTitle>{item.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          {item.description}
          </IonCardContent>
        </IonCard>
    </IonCol> 
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteItem, setCurrentItem })(ItemListItem);