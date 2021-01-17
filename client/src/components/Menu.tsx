import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react';
import { calendarOutline, hammer, moonOutline, help, informationCircleOutline, logIn, logOut, mapOutline, peopleOutline, person, personAdd } from 'ionicons/icons';
import { connect } from 'react-redux';
import { IMenu, IMenuReduxProps } from '../types/interfaces';

// import { connect } from '../data/connect';
// import { setDarkMode } from '../data/user/user.actions';

// import './Menu.css'

const Menu = ({ menuEnabled }:IMenu) => {

const routes = {
  appPages: [
    { title: 'Calendar', path: '/calendar', icon: calendarOutline },
    { title: 'Stats', path: '/stats', icon: peopleOutline },
    { title: 'Redeem', path: '/redeem', icon: mapOutline },
    { title: 'Settings', path: '/settings', icon: informationCircleOutline }
  ],
  loggedInPages: [
    { title: 'Account', path: '/account', icon: person },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Logout', path: '/logout', icon: logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Signup', path: '/signup', icon: personAdd }
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
}

// interface DispatchProps {
//   setDarkMode: typeof setDarkMode
// }

// interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu  type="overlay" 
    disabled={menuEnabled} 
    contentId="main">
      <IonContent forceOverscroll={false}>

        <IonList lines="none">
          <IonListHeader>Tardy</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>

        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {renderlistItems(routes.loggedInPages)  
          }
          <IonItem>
            <IonIcon slot="start" icon={moonOutline}></IonIcon>
            <IonLabel>Dark Mode</IonLabel>
            {/* <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} /> */}
          </IonItem>
        </IonList>
        <IonList lines="none">
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

 const mapStateToProps = (state: IMenuReduxProps) => ({

    menuEnabled: state.menuEnabled
  });

export default connect(null)(Menu)