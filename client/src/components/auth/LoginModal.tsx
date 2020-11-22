import React, { useState, useEffect } from 'react';
import {IonItem, IonInput, IonButton, IonToast, IonRoute } from "@ionic/react";
import { connect } from 'react-redux';
import { login } from '../../flux/actions/authActions';
import { clearErrors } from '../../flux/actions/errorActions';
import { ILoginModal, IAuthReduxProps } from '../../types/interfaces';


const LoginModal = ({
  isAuthenticated,
  error,
  login,
  clearErrors
}: ILoginModal) => {

  // const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState();
  const [showToast1, setShowToast1] = useState(false);
  // const [redirectToMain, setRedirectToMain] = useState(false);

  // const handleToggle = useCallback(() => {
  //   // Clear errors
  //   clearErrors();
  //   setModal(!modal);
  // }, [clearErrors, modal]);


  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const user = { email, password };

    // Attempt to login
    login(user);
  };
  

  useEffect(() => {
    // Check for register error
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
      setShowToast1(true)
    } 

    // If authenticated, redirect to home
      if (isAuthenticated) {
      }
  }, [error, isAuthenticated, ]);

  return (
    <div>
            <IonToast 
              position="top"
              isOpen={showToast1} 
              onDidDismiss={() => setShowToast1(false)} 
              message={msg}
              duration={1000}
              /> 
          <form>
              <IonItem>
              <IonInput
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onIonChange={e => setEmail(e.detail.value!)}              
                />
                </IonItem>
              <IonItem>
              <IonInput
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onIonChange={e => setPassword(e.detail.value!)}
                />
                </IonItem>
              <IonButton
              onClick={handleOnSubmit}
              expand="block"
              >
                Login
              </IonButton>
          </form>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);