import React, { useState, useEffect } from 'react';
import {IonItem, IonInput, IonButton, IonToast, IonRoute, IonTitle } from "@ionic/react";
import { connect } from 'react-redux';
import { login } from '../../flux/actions/authActions';
import { ILoginModal, IAuthReduxProps } from '../../types/interfaces';
import { useForm, Controller, useFieldArray } from "react-hook-form";

const LoginModal = ({
  isAuthenticated,
  authMsg,
  login,
}: ILoginModal) => {

  let initialValues = {
    email: "",
    password: ""
  }
  // const [modal, setModal] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
 
  // const [redirectToMain, setRedirectToMain] = useState(false);

  // const handleToggle = useCallback(() => {
  //   // Clear errors
  //   clearErrors();
  //   setModal(!modal);
  // }, [clearErrors, modal]);
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  });

  const [user, setUser] = useState();
  // const [msg, setMsg] = useState();
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

  const handleOnSubmit = (user: any) => {
    // Attempt to login
    setUser(user)
    login(user);
  };
  


  return (
    <div>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
          <IonItem>
              <Controller
                as={IonInput}
                type="email"
                placeholder="Email"
                control={control}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  return selected.detail.value;
                }}
                name="email"
                rules={{
                  required: true
                }}
              />
            </IonItem>
            {showError("email")}
            {/* {authMsg && <p className="auth-message">{authMsg}</p>}
          {console.log(authMsg)} */}
            <IonItem>
              <Controller
                as={IonInput}
                type="password"
                placeholder="Password"
                control={control}
                onChangeName="onIonChange"
                onChange={([selected]) => {
                  return selected.detail.value;
                }}
                name="password"
                rules={{
                  required: true
                }}
              />
            </IonItem>
            {showError("password")}
              
              <IonButton
              type="submit"
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
  authMsg: state.authMsg
});

export default connect(mapStateToProps, { login })(LoginModal);