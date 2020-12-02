import React, { useState, useEffect } from 'react';
import {IonItem, IonInput, IonButton, IonToast, IonRoute } from "@ionic/react";
import { connect } from 'react-redux';
import { login } from '../../flux/actions/authActions';
import { clearErrors } from '../../flux/actions/errorActions';
import { ILoginModal, IAuthReduxProps } from '../../types/interfaces';
import { useForm, Controller } from "react-hook-form";


const LoginModal = ({
  isLoaded,
  error,
  login,
  clearErrors
}: ILoginModal) => {

  
  let initialValues = {
    email: "",
    password: ""
  }

  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  });

  const [user, setUser] = useState();
  const [msg, setMsg] = useState();
  const [showToast1, setShowToast1] = useState(false);
/**
   *
   * @param _fieldName
   */
  const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };

/**
   *
   * @param data
   */
  const onSubmit = (user: any) => {
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
      if (isLoaded) {
      }
  }, [error, isLoaded, ]);

  return (
    <div>
            <IonToast 
              position="top"
              isOpen={showToast1} 
              onDidDismiss={() => setShowToast1(false)} 
              message={msg}
              duration={1000}
              /> 
          <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <Controller
                as={IonInput}
                placeholder="Email"
                control={control}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  return selected.detail.value;
                }}
                name="email"
                rules={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"}
                }}
              />
            </IonItem>
            {showError("email")}
              <IonItem>
              <Controller
                as={IonInput}
                placeholder="Password"
                control={control}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  return selected.detail.value;
                }}
                name="password"
                type="password"
                rules={{
                  required: true,
                }}
              />
              </IonItem>
              {showError("password")}
              <IonButton
              type="submit"
              expand="block"
              disabled={formState.isValid === false}
              >
                Login
              </IonButton>
          </form>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.firebase.auth,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);