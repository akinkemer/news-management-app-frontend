import loginSVG from "../svg/login.svg";
function SignInPage() {
  return (
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
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input type="text" className="form-control" id="inputUserName" />
              <div id="usernameHelp" className="form-text">
                This is your unique username.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
              />
              <div id="passwordHelp" className="form-text">
                Must be 8-20 characters long.
              </div>
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-block btn-primary p-2">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
