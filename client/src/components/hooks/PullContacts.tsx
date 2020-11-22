import React, { useState, useEffect } from 'react';
import { Contacts } from '@ionic-native/contacts';
import { IonContent, IonItem, IonList, IonLabel } from '@ionic/react';

let contacts: Contacts;
let contact:any;


const PullContacts = () => {

const contactList = [];   
    contacts.find(
      ["displayName", "phoneNumbers"],
      {multiple: true, hasPhoneNumber: true}
      )
      .then((Contacts: any) => {
        for (var i=0 ; i < Contacts.length; i++){
          if(Contacts[i].displayName !== null) {
            contact["name"]   = Contacts[i].displayName;
            contact["number"] = Contacts[i].phoneNumbers[0].value;
            contactList.push(contact);
          }
        }
    });

return(
    <IonList>
            {/* {contacts.map(({contact.name, contact.number}) =>
                <IonItem key={contact.number}>
                    {contact.name}
                    {contact.number}
                </IonItem>
            )} */}
        <IonItem>
        {contact.name}, 
        {contact.number}
        </IonItem>
    </IonList>
)
}

export default PullContacts;