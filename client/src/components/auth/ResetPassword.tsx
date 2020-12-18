import React, { useState, useEffect } from 'react';
import {IonItem, IonInput, IonButton, IonToast, IonRoute, IonTitle, IonContent, IonPage } from "@ionic/react";
import { connect } from 'react-redux';
import { resetPassword } from '../../flux/actions/authActions';
import { IResetPassword, IAuthReduxProps } from '../../types/interfaces';
import { useForm, Controller, useFieldArray } from "react-hook-form";

const ResetPassword = ({
    isAuthenticated,
    authMsg,
    resetPassword,
  }: IResetPassword) => {
  
    let initialValues = {
      email: "",
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
  
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
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
  
    const handleOnSubmit = (email: any) => {
      // Attempt to login
      resetPassword(email);
    };
    
  
    // useEffect(() => {
    //   // Check for register error
    //   if (error.id === 'LOGIN_FAIL') {
    //     setMessage(error.message.msg);
    //     setShowToast1(true)
    //   } 
  
    //   // If authenticated, redirect to home
    //     if (isAuthenticated) {
    //     }
    // }, [error, isAuthenticated, ]);
  
  
return (
    <IonPage>
    <IonContent>
    <div>
            <IonToast 
              position="top"
              isOpen={showToast1} 
              onDidDismiss={() => setShowToast1(false)} 
              message={message}
              /> 
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
            <IonButton type="submit">
                Reset password
            </IonButton>
            </form>
    </div>
    </IonContent>
    </IonPage>
  );
}

const mapStateToProps = (state: IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    authMsg: state.authMsg
  });
  
  export default connect(mapStateToProps, { resetPassword })(ResetPassword);