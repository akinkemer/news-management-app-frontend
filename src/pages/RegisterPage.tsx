import accountSVG from "../svg/account.svg";
function RegisterPage() {
  return (
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
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Full Name
              </label>
              <input type="text" className="form-control" id="inputUserName" />
            </div>
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
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
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
                Create Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
