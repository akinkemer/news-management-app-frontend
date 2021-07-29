import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { RiUser3Line,RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch} from "react-redux";
import { logout } from "../service/user/UserActions";

interface INavbarProps {
  isLoggedIn: boolean;
  userRoles: string[];
  userFullName: string;
}

const Navbar: FunctionComponent<INavbarProps> = (props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }
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
            <li className="nav-item">
              <Link to="/news" className="nav-link">News</Link>
            </li>
            <li className="nav-item">
              <Link to="/announcements" className="nav-link">Announcements</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
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
                    <button className="dropdown-item btn" onClick={()=>handleLogout()}>
                      <RiLogoutBoxLine size={"1.2em" } className="mb-1"/>
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
