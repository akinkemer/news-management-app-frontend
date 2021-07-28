import { Redirect, Route, useLocation } from "react-router-dom";

type PrivateRouteProps = {
  component: React.FC;
  isLogged: boolean;
  redirectPath: string;
};
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isLogged,
  redirectPath,
  ...rest
}) => {
  const location = useLocation();
  return (
    <Route {...rest}>
      {isLogged === true ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: location, message: "Lütfen önce giriş yapınız." },
          }}
        />
      )}
    </Route>
  );
};

export default PrivateRoute;
