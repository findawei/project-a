import React from 'react';
import { IonContent, IonPage, IonTitle, IonItem, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonCard, IonCardContent, IonImg, IonRow, IonCol } from '@ionic/react';
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

import EventEdit from '../components/EventEdit';
import EventLog from '../components/EventLog';
import { calendar, cog, star, statsChartOutline } from 'ionicons/icons';
import logo from '../tardy-logo.jpg';

import './Landing.css'
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
import InvitePage from '../components/InviteModal';
import ItemDetails from '../components/ItemDetails';

const Landing = ({ auth }: ILanding) => {

  const authLinks = (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
            <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
            <Route path="/tab1" component={Tab1} />
            <Route path="/tab2" component={Tab2} />
            <Route path="/tab3" component={Tab3} />
            <Route path="/tab4" component={Tab4} />
            <Route path="/event/:_id" component={EventEdit} exact={true} />
            <Route path="/event/log/:_id" component={EventLog}/>
            <Route path="/item/:_id" component={ItemDetails}/>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
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
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    
  );

  const guestLinks = (
    <IonPage>
    <IonContent>
    <IonRow>
      <IonCol>
      <IonImg
         src={logo} alt="logo"
        >
        </IonImg>
      <IonCard>
        <IonCardContent>
          <LoginModal/>
        </IonCardContent>
      </IonCard>
      </IonCol>
      </IonRow>
    </IonContent>
    <RegisterModal />
    </IonPage>
  );
  
  return (
    <div>
      {/* {auth && auth.isAuthenticated ? authLinks : guestLinks} */}
      {authLinks}
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Landing);



