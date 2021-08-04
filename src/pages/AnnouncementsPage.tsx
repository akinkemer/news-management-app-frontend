import { connect } from "../service/websocket/AnnouncementBroker";
import { FcAdvertising } from "react-icons/fc";
import { Animate } from "react-simple-animate";
import { useEffect } from "react";
import { getAnnouncements } from "../service/event/EventActions";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../service/index";
function AnnouncementsPage() {
  const announcements = useSelector(
    (state: RootState) => state.event.announcements
  );
  const isLoading = useSelector((state: RootState) => state.event.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncements());
  }, []);

  useEffect(() => {
     asyncConnect();
  },[]);

  const asyncConnect = async () => {
    connect();
  };
  return (
    <Animate
      play
      start={{ opacity: 0 }}
      end={{ opacity: 1 }}
      delay={0.1}
      duration={0.6}
    >
      <div className="container">
        <div className="my-4">
          <h6 className="display-6">
            Announcements
            <FcAdvertising className="mx-2 mb-2" />
          </h6>
          <hr />
        </div>
        <div className="card mb-3">
          <div className="card-header">News</div>
          <div className="card-body">
            <div className="row" style={{ minHeight: "10vh" }}>
              {isLoading ? (
                <div
                  className="spinner-border mx-auto my-auto"
                  role="status"
                ></div>
              ) : (
                announcements.length > 0 &&
                announcements.map((announc) => {
                  return (
                    <div className="col-md-4" key={announc.id}>
                      <div className="card mb-3">
                        <img src={announc.imageLink} className="card-img-top" />
                        <div className="card-body">
                          <h5 className="card-title">{announc.subject}</h5>
                          <p className="card-text">{announc.content}</p>
                          <span className="blockquote-footer">
                            Invalid At:{" " + announc.invalidAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </Animate>
  );
}

export default AnnouncementsPage;
