import { Animate } from "react-simple-animate";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcNews, FcAddImage } from "react-icons/fc";
import * as Types from "../service/event/ActionTypes";
import { RootState } from "../service/index";
import { Modal } from "react-bootstrap";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineLink,
} from "react-icons/ai";
import {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
} from "../service/event/EventActions";
function ManageNewsPage() {
  const news = useSelector((state: RootState) => state.event.news);
  const isLoading = useSelector((state: RootState) => state.event.isLoading);
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [invalidAt, setInvalidAt] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<string>("");
  const deleteNews = (id: number) => {
    /*dispatch(deleteAnnouncement(id));*/
  };
  const updateNews = (news: Types.News) => {
    /* setSubject(announcement.subject);
        setContent(announcement.content);
        setInvalidAt(announcement.invalidAt);
        setImageLink(announcement.imageLink);
        setId(announcement.id);
        setCreatedAt(announcement.createdAt);
        setUpdateModalIsOpen(true);*/
  };
  const handleCreateForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
    const closeCreateModal = () => {
        setModalIsOpen(false);
}
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
            Manage Your News
            <FcNews className="mx-2 mb-2" />
          </h6>
          <hr />
        </div>
        <div className="mb-3">
          <button
            className="btn btn-outline-primary py-2 px-4"
            onClick={() => {setModalIsOpen(true)}}
          >
            Create News
            <AiOutlinePlus size="1.3em" className="mx-1 mb-1" />
          </button>
        </div>
        <div className="card mb-3">
          <div className="card-header">News</div>
          <div className="card-body">
            <div className="row">
              {news.length > 0 &&
                news.map((news) => {
                  return (
                    <div className="col-md-4" key={news.id}>
                      <div className="card mb-3">
                        <div className="card-header">
                          <div className="d-flex justify-content-end">
                            <AiOutlineEdit
                              className="mx-2 p-0 btn btn-outline-primary"
                              size="2em"
                              onClick={() => {
                                updateNews(news);
                              }}
                            />
                            <AiOutlineDelete
                              className="mx-2 p-0 btn btn-outline-primary"
                              onClick={() => {
                                deleteNews(news.id);
                              }}
                              size="2em"
                            />
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{news.subject}</h5>
                          <p className="card-text">{news.content}</p>
                          <a href={news.link}>
                            <AiOutlineLink />
                            Link
                          </a>
                          <span className="blockquote-footer">
                            Invalid At:{" " + news.invalidAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={modalIsOpen}
        onHide={() => closeCreateModal()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        animation={true}
        centered
      >
        <Modal.Header>
          Create News
          <AiOutlineClose size="1.3em" onClick={() => closeCreateModal()} />
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <form
                className="mx-3 mt-3"
                onSubmit={(event) => handleCreateForm(event)}
              >
                <div className="mb-3">
                  <label htmlFor="inputUserName" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contentText" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contentText" className="form-label">
                    Invalidation Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setInvalidAt(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid mb-3">
                  {isLoading ? (
                    <button
                      type="submit"
                      className="btn btn-block btn-primary p-2"
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-block btn-primary p-2"
                    >
                      Create News
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Animate>
  );
}

export default ManageNewsPage;
