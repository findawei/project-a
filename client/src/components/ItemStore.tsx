import React, { useEffect } from 'react';
import { IonBadge, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import {connect} from 'react-redux';
import {getItems} from '../flux/actions/itemActions';
import { IItemReduxProps, IItemStore } from '../types/interfaces';
import ItemListItem from './ItemListItem';


const ItemStore = ({ auth, getItems, item }: IItemStore) => {

  useEffect(() => { 
    getItems(); 
  }, [getItems]);
 
  const { items } = item;

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonBadge slot="end" color="success">
          {auth!.user.points}
          </IonBadge>
          <IonTitle>Redeemable Items, Points </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonGrid>
        <IonRow>
          {items.map(item => <ItemListItem 
          item={item} 
          key={item._id}/>
          )}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { getItems })(ItemStore);