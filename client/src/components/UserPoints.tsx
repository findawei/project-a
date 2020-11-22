import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import { IonItem } from '@ionic/react';
import { IAuthReduxProps, ILanding } from '../types/interfaces';

const UserPoints = ({auth}: ILanding) => {

  const [points, setPointsE] = useState(auth!.user.points)

  

    return (
          <IonItem>
            {points}
          </IonItem>
      );
}

const mapStateToProps = (state: IAuthReduxProps) => ({
    auth: state.auth
  });

export default connect(mapStateToProps, null)(UserPoints);