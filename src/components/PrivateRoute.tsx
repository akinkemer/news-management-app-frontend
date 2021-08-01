import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute: React.FC<{
  access: boolean;
  redirectPath: string;
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {

  return props.access ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to={props.redirectPath} />
  );
};
export default PrivateRoute;
