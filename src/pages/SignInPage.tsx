import { useState, useEffect, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../service/index";
import { login } from "../service/user/UserActions";
import loginSVG from "../svg/login.svg";
import { Animate } from "react-simple-animate";
import { Row, Modal, Col } from "react-bootstrap";
import { FcOk } from "react-icons/fc";
import { userNameRegex, passwordRegex } from "../utils/Regex";

const SignInPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const message = useSelector((state: RootState) => state.user.message);
  const history = useHistory();

  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loginFailedMessage, setLoginFailedMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (username.match(userNameRegex)) {
      setIsUserNameValid(true);
    } else {
      setIsUserNameValid(false);
    }
  }, [username]);

  useEffect(() => {
    if (password.match(passwordRegex)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [password]);
  useEffect(() => {
    if (message === "Request failed with status code 401") {
      setLoginFailedMessage("Please check your username and password!");
    } else {
      setLoginFailedMessage("");
    }
  }, [message]);
  useEffect(() => {
    if (isLoggedIn) {
      showModal();
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [isLoggedIn,history]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFirstVisit(false);
    if (isUserNameValid && isPasswordValid) {
      dispatch(login({ userName: username, password: password }));
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const userNameStyle = isFirstVisit
    ? "form-control"
    : isUserNameValid
    ? "form-control is-valid"
    : "form-control is-invalid";
  const passwordStyle = isFirstVisit
    ? "form-control"
    : isPasswordValid
    ? "form-control is-valid"
    : "form-control is-invalid";
  return (
    <Animate
      play
      start={{ opacity: 0 }}
      end={{ opacity: 1 }}
      delay={0.1}
      duration={0.6}
    >
      <div>
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mt-5">Sign In Your Account</h1>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-6 mb-5">
            <img
              src={loginSVG}
              className="img-fluid mx-auto d-block"
              width="400px"
              alt="Sign In"
            />
          </div>
          <div className="col-md-6 col-xl-4 my-auto">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="inputUserName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className={userNameStyle}
                  id="inputUserName"
                  value={username}
                  onChange={(e) => handleUsername(e)}
                  required
                />
                {isFirstVisit ? (
                  <div className="form-text">This is your unique username.</div>
                ) : null}
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please select a valid username.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={passwordStyle}
                  id="inputPassword"
                  value={password}
                  onChange={(e) => handlePassword(e)}
                />
                {isFirstVisit ? (
                  <div className="form-text">Must be 8-20 characters long.</div>
                ) : null}
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Must be 8-20 characters long
                </div>
              </div>
              <div className="d-grid mb-3">
                {isLoading ? (
                  <button
                    className="btn btn-block btn-primary p-2"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="btn btn-block btn-primary p-2 is-invalid"
                    >
                      Sign In
                    </button>
                    <div className="invalid-feedback">{loginFailedMessage}</div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        show={modalIsOpen}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        animation={true}
        centered
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <Row className="mx-auto mb-1 text-center">
            <Col xs={12}>
              <FcOk size={"4em"} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-center">
              <h4 style={{ color: "#4caf50" }}>Login Successful!</h4>
            </Col>
          </Row>
          <h6 className="text-center mt-3">
            You are redirecting the main page...
          </h6>
        </Modal.Body>
      </Modal>
    </Animate>
  );
};
export default SignInPage;
