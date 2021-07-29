import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import MainPage from "./pages/MainPage";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";

import { useDispatch, useSelector } from "react-redux";
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

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userRoles = useSelector((state: RootState) => state.user.userRoles);
  const userFullName = useSelector((state: RootState) => state.user.fullName);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userRoles={userRoles} userFullName={userFullName} />
      <div className="container">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/announcements" component={AnnouncementsPage} />
          {isLoggedIn ? (
            <Redirect to="/" />
          ) : (
            <Route exact path="/signIn" component={SignInPage} />
          )}
          <Route exact path="/register" component={RegisterPage} />
          <Route component={NotFoundErrorPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
