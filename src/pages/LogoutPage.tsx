import { useEffect } from "react";
import { Animate } from "react-simple-animate";
import { Link } from "react-router-dom";
import { FcExport } from "react-icons/fc";
import { useHistory } from "react-router-dom";

function LogoutPage() {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 2000);
  });
  return (
    <Animate
      play
      start={{ opacity: 0 }}
      end={{ opacity: 1 }}
      delay={0.1}
      duration={0.8}
    >
      <div
        className="d-flex flex-row align-items-center"
        style={{ minHeight: "73vh" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">Logout Succesful</span>

              <div className="mb-4">
                <FcExport size={"5em"} />
              </div>

              <Link to={"/"} className="btn btn-link col-12">
                Continue without login
              </Link>
              <div className="spinner-border text-success mt-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Animate>
  );
}
<div className="spinner-border text-primary" role="status"></div>;
export default LogoutPage;
