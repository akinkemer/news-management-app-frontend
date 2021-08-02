import { Animate } from "react-simple-animate";
import { Link } from "react-router-dom";
import landingSVG from "../svg/landing.svg";
function MainPage() {
  return (
    <Animate
      play
      start={{ opacity: 0 }}
      end={{ opacity: 1 }}
      delay={0.1}
      duration={0.8}
    >
      <div className="bg-light" style={{minHeight: "73vh"}}>
        <div className="container">
          <div className="d-flex justify-content-center pt-4">
            <div className="mx-4 my-auto">
              <h3>Why are you still wasting time </h3>
              <h3>on receiving news? </h3>
              <p>Receive your company news and announcements immediately</p>
              <Link to="/register" className="btn btn-primary py-2 px-4 mt-4">
                REGISTER
              </Link>
              <button className="btn btn-outline-primary py-2 px-3 mt-4 mx-lg-4">
                REQUEST A DEMO
              </button>
            </div>
            <div className="mx-4 my-auto">
              <img
                src={landingSVG}
                className="img-fluid mx-auto d-block"
                width="400px"
                alt="Landing SVG"
              />
            </div>
          </div>
        </div>
      </div>
    </Animate>
  );
}

export default MainPage;
