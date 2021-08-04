import { Animate } from "react-simple-animate";
import { useEffect, useState } from "react";
import { FcNews } from "react-icons/fc";
import { AiOutlineLink } from "react-icons/ai";
import { getNews } from "../service/event/EventActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../service/index";
import { AiOutlineClose } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import * as Types from "../service/event/ActionTypes";

function NewsPage() {
  const news = useSelector((state: RootState) => state.event.news);
  const isLoading = useSelector((state: RootState) => state.event.isLoading);

  const dispatch = useDispatch();
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [popUpState, setPopUpState] = useState<Types.News | null>();

  useEffect(() => {
    dispatch(getNews());
  }, []);

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
            News
            <FcNews className="mx-2 mb-2" />
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
                news.length > 0 &&
                news.map((news) => {
                  return (
                    <div
                      className="col-md-4"
                      key={news.id}
                      onClick={() => {
                        setIsPopUpOpen(true);
                        setPopUpState(news);
                      }}
                    >
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{news.subject}</h5>
                          <p className="card-text">{news.content}</p>
                          <a href={news.link}>
                            <AiOutlineLink />
                            Link
                          </a>
                          <span className="blockquote-footer mx-3">
                            Invalid At:{" " + news.invalidAt}
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

        <Modal
          show={isPopUpOpen}
          onHide={() => setIsPopUpOpen(false)}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          animation={true}
          centered
        >
          <Modal.Header>
            {popUpState?.subject}
            <AiOutlineClose
              size="1.3em"
              onClick={() => setIsPopUpOpen(false)}
            />
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="card-body">
                <h5 className="card-title">{popUpState?.subject}</h5>
                <p className="card-text">{popUpState?.content}</p>
                <a href={popUpState?.link}>
                  <AiOutlineLink />
                  Link
                </a>
                <span className="blockquote-footer mx-3">
                  Invalid At:{" " + popUpState?.invalidAt}
                </span>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </Animate>
  );
}

export default NewsPage;
