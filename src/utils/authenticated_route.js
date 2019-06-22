import React from "react";
import { observer } from "mobx-react";
import { Route, Redirect } from "react-router-dom";
import routes from "../utils/routes";

const AuthenticatedRoute = ({ store, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (store.sessionStore.isSignedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to={routes.signIn()} />;
        }
      }}
    />
  );
};

export default observer(AuthenticatedRoute);
