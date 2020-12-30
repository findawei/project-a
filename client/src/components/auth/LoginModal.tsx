import React, { useState } from 'react';
import {IonItem, IonInput, IonButton, IonText, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import { connect } from 'react-redux';
import { login, loginMicrosoft, register, resetPassword } from '../../flux/actions/authActions';
import { ILoginModal, IAuthReduxProps } from '../../types/interfaces';
import { useForm, Controller } from "react-hook-form";
import MsBtn from './ms.svg'


const LoginModal = ({
  isAuthenticated,
  authMsg,
  login,
  register,
  resetPassword,
  loginMicrosoft
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
  const [newUser, setNewUser] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [pwreset, SetReset] = useState(false);

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
    if (newUser) {
          // signup
          register(user);
        } else {
          if (pwreset) {
            // reset password
            resetPassword(user.email);
          } else {
            // signin
                login(user);

            ;
          }
        }
      }

  return (
      <div>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
          {/* <IonButton
          onClick={() => {
            setNewUser(!newUser);
            if (pwreset) SetReset(false);
          }}
          className="btn-switch"
        >
          {newUser ? "Sign in" : "Create an account"}
        </IonButton> */}

          {!pwreset && (
            <div>
          <IonSegment 
          // onIonChange={e => console.log('Segment selected', e.detail.value)} 
          value=
          {
            // pwreset ? "Reset password" : 
          newUser ? "signup" : "signin"}
          >
          <IonSegmentButton value="signin"
          onClick={() => {
            setNewUser(!newUser);
            if (pwreset) SetReset(false);
          }}
          className="btn-switch"
        
          >
            
            <IonLabel>Sign in</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="signup"
          onClick={() => {
            setNewUser(!newUser);
            if (pwreset) SetReset(false);
          }}
          className="btn-switch"
        >
            <IonLabel>Sign up</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        </div>
        )}

        {/* MS signin button */}
        <IonButton expand="full" fill="clear" onClick={()=>loginMicrosoft()}>
          <img src={MsBtn} alt="Ms Auth Btn"/>
        </IonButton> 


        {pwreset && (
            <IonButton onClick={() => SetReset(false)} className="btn-link" fill="outline" size="small">
              Back
            </IonButton>
          )}
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
          {!pwreset && (
            <div>
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
            </div>
            )}
              <IonButton
              type="submit"
              expand="block"
             >
                {
            //     loading ? (
            //   <IonSpinner />
            // ) : 
            pwreset ? (
              "Reset password"
            ) : newUser ? (
              "Create account"
            ) : (
              "Sign in"
            )}
              </IonButton>
              {!newUser && !pwreset && (
            <IonText onClick={() => SetReset(true)} className="btn-link">
              Forgot password?
            </IonText>
          )}
             {/* <p>
          {newUser ? "Already have an account?" : "Don't have an account yet?"}
        </p> */}
          </form>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authMsg: state.authMsg
});

export default connect(mapStateToProps, { login, resetPassword, register, loginMicrosoft })(LoginModal);