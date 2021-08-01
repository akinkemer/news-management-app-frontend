import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { RiUser3Line, RiLogoutBoxLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../service/user/UserActions";
import { useHistory } from "react-router-dom";

interface INavbarProps {
  isLoggedIn: boolean;
  isUserAdmin:boolean;
  userFullName: string;
}

const Navbar: FunctionComponent<INavbarProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    history.push("/logout");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to={"/"} className="navbar-brand mb-0 h1 fs-3">
          NEWS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {props.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/news" className="nav-link">
                    News
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/announcements" className="nav-link">
                    Announcements
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
          <ul className="navbar-nav ms-auto">
            {props.isLoggedIn && props.isUserAdmin ? (
              <li className="nav-item dropdown mx-md-2">
                <button
                  className="btn btn-outline-secondary nav-link dropdown-toggle px-2"
                  id="manageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <IoSettingsOutline size={"1.2em"} className="mx-1 mb-1" />
                  Manage
                </button>
                <ul className="dropdown-menu" aria-labelledby="manageDropdown">
                  <li className="nav-item">
                    <Link to="/manageAnnouncements" className="dropdown-item">
                      Manage Announcements
                    </Link>
                    <Link to="/manageNews" className="dropdown-item">
                      Manage News
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null}
            {props.isLoggedIn ? (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-secondary nav-link dropdown-toggle px-2"
                  id="accountDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <RiUser3Line size={"1.2em"} className="mx-1 mb-1" />
                  {props.userFullName}
                </button>
                <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                  <li className="nav-item">
                    <button
                      className="dropdown-item btn"
                      onClick={() => handleLogout()}
                    >
                      <RiLogoutBoxLine size={"1.2em"} className="mb-1" />
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item mx-lg-2 my-lg-0 my-sm-2">
                  <Link to={"/signIn"} className="btn btn-secondary">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="btn btn-secondary">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
