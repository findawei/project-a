import React from 'react';
import { IonContent, IonPage, IonTitle, IonItem, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonCard, IonCardContent, IonImg, IonRow, IonCol, IonSplitPane, IonMenu, IonList, IonListHeader, IonToolbar, IonHeader, IonMenuToggle, IonButtons, IonButton } from '@ionic/react';
import { ILanding, IAuthReduxProps } from '../types/interfaces';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';
import { connect } from 'react-redux';
import Tab1 from './Tab1';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';

// import EventEdit from '../components/EventEdit';
// import EventLog from '../components/EventLog';
import { calendar, cog, star, statsChartOutline } from 'ionicons/icons';
import logo from '../tardy-logo.jpg';


import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './Landing.css'
// import InvitePage from '../components/InviteModal';
import ItemDetails from '../components/ItemDetails';
import Menu from '../components/Menu';
import ResetPassword from '../components/auth/ResetPassword';

const Landing = ({ auth }: ILanding) => {

  const authLinks = (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
            <Route path="/" render={() => <Redirect to="/calendar" />} exact={true} />
            <Route path="/calendar" component={Tab1} />
            <Route path="/stats" component={Tab2} />
            <Route path="/settings" component={Tab3} />
            <Route path="/redeem" component={Tab4} />
            {/* <Route path="/event/:_id" component={EventEdit} exact={true} /> */}
            {/* <Route path="/event/log/:_id" component={EventLog}/> */}
            <Route path="/item/:_id" component={ItemDetails}/>
        </IonRouterOutlet>

        {/* <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
          <IonIcon icon={calendar}></IonIcon>
            <IonLabel>Events</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={statsChartOutline} />
            <IonLabel>My Stats</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon icon={star} />
            <IonLabel>Redeem</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={cog} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
      </IonSplitPane>
    </IonReactRouter>
    
  );

  const guestLinks = (
    <IonPage>
    <IonContent>
    <IonRow class="ion-align-items-center">
      <IonCol>
      <IonImg
         src={logo} alt="logo"
        >
        </IonImg>
      <IonCard class="ion-card">
        <IonCardContent>
          <LoginModal/>
          <div 
          >Forgot password?</div>
          <RegisterModal />
        </IonCardContent>
      </IonCard>
      </IonCol>
      </IonRow>
    </IonContent>
    </IonPage>
  );
  
  return (
    <div>
      {auth && auth.isAuthenticated ? authLinks : guestLinks}
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Landing);



