import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to={"/"} className="navbar-brand mb-0 h1 fs-3">NEWS</Link>
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
              <a className="nav-link">Contact Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Write Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Log In</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
          <li className="nav-item mx-2">
              <Link to={"/signIn"} className="btn btn-secondary">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="btn btn-secondary">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
} export default Navbar;
