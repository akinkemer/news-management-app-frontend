import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import MainPage from "./pages/MainPage";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import {useSelector } from "react-redux";
import { RootState } from "./service/index";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import NewsPage from "./pages/NewsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import LogoutPage from "./pages/LogoutPage";
import ManageNewsPage from "./pages/ManageNewsPage";
import ManageAnnounsPage from "./pages/ManageAnnounsPage";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userRoles = useSelector((state: RootState) => state.user.userRoles);
  const userFullName = useSelector((state: RootState) => state.user.fullName);
  const isUserAdmin = (): boolean => {
    if (userRoles.some((r) => r.name === "ROLE_ADMIN")) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} isUserAdmin={isUserAdmin()} userFullName={userFullName} />
      <div className="container">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <PrivateRoute exact path="/news" component={NewsPage} access={isLoggedIn} redirectPath="/" />
          <PrivateRoute exact path="/announcements" component={AnnouncementsPage} access={isLoggedIn} redirectPath="/" />
          <PrivateRoute exact path="/manageNews" component={ManageNewsPage} access={isUserAdmin() } redirectPath="/"/>
          <PrivateRoute exact path="/manageAnnouncements" component={ManageAnnounsPage} access={isUserAdmin() } redirectPath="/" />
          <PrivateRoute exact path="/signIn" component={SignInPage} access={!isLoggedIn} redirectPath="/"/>
          <Route exact path="/logout" component={LogoutPage} />
          <PrivateRoute exact path="/register" component={RegisterPage} access={!isLoggedIn} redirectPath="/" />
          <Route component={NotFoundErrorPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
