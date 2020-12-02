import React, { useState, useCallback, useEffect } from 'react';
import { IonContent, IonItem, IonInput, IonButton, IonButtons, IonToolbar, IonTitle, IonHeader, IonModal, IonToast, IonFooter, IonLabel } from "@ionic/react";
import { connect } from 'react-redux';
import { register } from '../../flux/actions/authActions';
import { clearErrors } from '../../flux/actions/errorActions';
import { IRegisterModal, IAuthReduxProps } from '../../types/interfaces';


const RegisterModal = ({
  isLoaded,
  error,
  register,
  clearErrors
}: IRegisterModal) => {

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState();
  const [showToast1, setShowToast1] = useState(false);

  const handleToggle = useCallback(() => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);



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

  useEffect(() => {
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
      setShowToast1(true)
    }

    // If authenticated, close modal
    if (modal) {
      if (isLoaded) {
        handleToggle();
      }
    }
  }, [error, handleToggle, isLoaded, modal]);

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
              message={msg}
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
              <IonTitle>
                <div className="ion-text-center">
                Register
                </div>
              </IonTitle>
            </IonToolbar>
            </IonHeader>
              <IonItem>
              <IonInput
                required
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onIonChange={e => setName(e.detail.value!)}
              />
              </IonItem>
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
              onClick={handleOnSubmit}
              >
                Register
              </IonButton>
          </form>
        </IonContent>
      </IonModal>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.firebase.auth,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);