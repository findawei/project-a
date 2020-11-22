import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { IAuthReduxProps } from "../types/interfaces";

interface IPrivateRoute extends RouteProps {
  isAuthenticated?: boolean;
  component: any;
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: IPrivateRoute) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps)(PrivateRoute);