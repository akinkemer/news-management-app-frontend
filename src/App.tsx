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
        <Switch>
          <Route exact path="/" component={MainPage} />
          <PrivateRoute exact path="/news" component={NewsPage} access={isLoggedIn} redirectPath="/" />
          <PrivateRoute exact path="/announcements" component={AnnouncementsPage} access={isLoggedIn} redirectPath="/" />
          <PrivateRoute exact path="/manageNews" component={ManageNewsPage} access={isUserAdmin() } redirectPath="/"/>
          <PrivateRoute exact path="/manageAnnouncements" component={ManageAnnounsPage} access={isUserAdmin() } redirectPath="/" />
          <Route exact path="/signIn" component={SignInPage}/>
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route component={NotFoundErrorPage} />
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
