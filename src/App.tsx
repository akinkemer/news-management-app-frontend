import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import MainPage from "./pages/MainPage";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";

import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/signIn" component={SignInPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route component={NotFoundErrorPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
