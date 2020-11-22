import React, { useEffect } from 'react';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import {connect} from 'react-redux';
import {getPurchases} from '../flux/actions/purchaseActions';
import { IPurchaseReduxProps, IPurchaseHistory } from '../types/interfaces';
import PurchaseListItem from './PurchaseListItem';

const PurchaseHistory = ({ getPurchases, purchase }: IPurchaseHistory) => {

  useEffect(() => { 
    getPurchases(); 
  }, [getPurchases]);
 
  const { purchases } = purchase;

  return (
    <IonContent>
      <IonList>
          {purchases.map(purchase =>
            <PurchaseListItem
            purchase={purchase}
            key={purchase._id}
            />)}
      </IonList>
    </IonContent>
  );
};

const mapStateToProps = (state: IPurchaseReduxProps) => ({
  purchase: state.purchase
});

export default connect(mapStateToProps, { getPurchases })(PurchaseHistory);