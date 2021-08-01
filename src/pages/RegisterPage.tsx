import { Animate } from "react-simple-animate";
import accountSVG from "../svg/account.svg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../service/user/UserActions";
import { Row, Modal, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { RootState } from "../service/index";
import { FcOk } from "react-icons/fc";

import {
  userNameRegex,
  fullNameRegex,
  emailRegex,
  passwordRegex,
} from "../utils/Regex";

function RegisterPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const message = useSelector((state: RootState) => state.user.message);
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const [registerFailedMessage, setRegisterFailedMessage] = useState("");

  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFullNameValid, setIsFullNameValid] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (userName.match(userNameRegex)) {
      setIsUserNameValid(true);
    } else {
      setIsUserNameValid(false);
    }
  }, [userName]);
  useEffect(() => {
    if (fullName.match(fullNameRegex)) {
      setIsFullNameValid(true);
    } else {
      setIsFullNameValid(false);
    }
  }, [fullName]);
  useEffect(() => {
    if (email.match(emailRegex)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }, [email]);
  useEffect(() => {
    if (password.match(passwordRegex)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [password]);

  const onChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };
  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFirstVisit(false);
    if (isFullNameValid && isUserNameValid && isEmailValid && isPasswordValid) {
      dispatch(
        register({
          userName: userName,
          name: fullName,
          email: email,
          password: password,
        })
      );
    }
    if (message === "Username already taken") {
      setIsUserNameValid(false);
    } else if (message === "User registered successfully") {
      setModalIsOpen(true);
      setTimeout(() => { history.push("/signIn") }, 1000);
    }
  };

  const validStyle = (toBeChecked: boolean): string => {
    return isFirstVisit
      ? "form-control"
      : toBeChecked
      ? "form-control is-valid"
      : "form-control is-invalid";
  };
  const userNameStyle = validStyle(isUserNameValid);
  const fullNameStyle = validStyle(isFullNameValid);
  const emailStyle = validStyle(isEmailValid);
  const passwordStyle = validStyle(isPasswordValid);

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
            <h1 className="text-center mt-5">Let's Create Your Account</h1>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-6 mb-5">
            <img
              src={accountSVG}
              className="img-fluid mx-auto d-block mt-md-5"
              width="400px"
              alt="Sign In"
            />
          </div>
          <div className="col-md-6 col-xl-4 my-auto">
            <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
              <div className="mb-3">
                <label htmlFor="inputFullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="inputFullName"
                  className={fullNameStyle}
                  value={fullName}
                  onChange={(e) => onChangeFullName(e)}
                  required
                />
                {isFirstVisit ? (
                  <div className="form-text">
                    This is your name and surname.
                  </div>
                ) : null}
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please enter your firstname and lastname.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputUserName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="inputUserName"
                  className={userNameStyle}
                  value={userName}
                  onChange={(e) => onChangeUserName(e)}
                  required
                />
                {isFirstVisit ? (
                  <div className="form-text">This is your unique username.</div>
                ) : null}
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  This username already taken. Please choose another one.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="inputEmail"
                  className={emailStyle}
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => onChangeEmail(e)}
                  autoComplete="on"
                  required
                />
                {isFirstVisit ? (
                  <div className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                ) : null}
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please select a valid email.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="inputPassword"
                  className={passwordStyle}
                  value={password}
                  onChange={(e) => onChangePassword(e)}
                  autoComplete="new-password"
                  required
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
                      className="btn btn-block btn-primary p-2 "
                    >
                      Create Now
                    </button>
                  </>
                )}
              </div>
            </form>
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
              <h4 style={{ color: "#4caf50" }}>Your account created successfully!</h4>
            </Col>
          </Row>
          <h6 className="text-center mt-3">
            You are redirecting the sign in page...
          </h6>
        </Modal.Body>
      </Modal>
      </div>
    </Animate>
  );
}

export default RegisterPage;
