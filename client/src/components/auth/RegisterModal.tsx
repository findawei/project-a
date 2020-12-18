import React, { useState, useCallback, useEffect } from 'react';
import { IonContent, IonItem, IonInput, IonButton, IonButtons, IonToolbar, IonTitle, IonHeader, IonModal, IonToast, IonFooter, IonLabel, IonCard, IonCardContent, IonCol, IonRow } from "@ionic/react";
import { connect } from 'react-redux';
import { register } from '../../flux/actions/authActions';
import { IRegisterModal, IAuthReduxProps } from '../../types/interfaces';


const RegisterModal = ({
  isAuthenticated,
  authMsg,
  register,
}: IRegisterModal) => {

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();
  const [showToast1, setShowToast1] = useState(false);

  const handleToggle = useCallback(() => {
    // Clear errors
    setModal(!modal);
  }, [ modal]);



  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    // Create user object
    const user = {
      name,
      email,
      password
    };

    // Attempt to login
    register(user);
  };

  // useEffect(() => {
  //   // Check for register error
  //   if (error.id === 'REGISTER_FAIL') {
  //     setMessage(error.message.msg);
  //     setShowToast1(true)
  //   }

  //   // If authenticated, close modal
  //   if (modal) {
  //     if (isAuthenticated) {
  //       handleToggle();
  //     }
  //   }
  // }, [error, handleToggle, isAuthenticated, modal]);

  return (
    <div>
      
      <IonFooter className="ion-no-border">
      <IonToolbar class="ion-text-center">
        <IonLabel>New user? </IonLabel>
        <IonLabel onClick={handleToggle} color="primary">
        Create account
      </IonLabel>
      </IonToolbar>
    </IonFooter>

     

      <IonModal isOpen={modal} onDidDismiss={() => setModal(false)}>
        <IonContent>
        <IonToast 
              position="top"
              isOpen={showToast1} 
              onDidDismiss={() => setShowToast1(false)} 
              message={message}
              duration={1000}
              /> 
          <form>

  

          <IonHeader>
              <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setModal(false)}>
                    Cancel
                </IonButton>
              </IonButtons>
              <IonTitle className="ion-text-center">
               Register
              </IonTitle>
            </IonToolbar>
            </IonHeader>

            <IonRow class="ion-justify-content-center">
      <IonCol>
      <IonCard class="ion-card">
        <IonCardContent>
          

          
      
              {/* <IonItem>
              <IonInput
                required
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onIonChange={e => setName(e.detail.value!)}
              />
              </IonItem> */}
              <IonItem>
              <IonInput
                required
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onIonChange={e => setEmail(e.detail.value!)}
              />
              </IonItem>
              <IonItem>
              <IonInput
                required
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onIonChange={e => setPassword(e.detail.value!)}
              />
              </IonItem>
              <IonButton
              expand="block"
              onClick={handleOnSubmit}
              >
                Register
              </IonButton>
          </IonCardContent>
      </IonCard>
      </IonCol>
      </IonRow>
      </form>

        </IonContent>
      </IonModal>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authMsg: state.authMsg

});

export default connect(mapStateToProps, { register })(
  RegisterModal
);