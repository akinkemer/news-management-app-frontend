import { Animate } from "react-simple-animate";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcNews } from "react-icons/fc";
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
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../service/event/EventActions";
function ManageNewsPage() {
  const news = useSelector((state: RootState) => state.event.news);
  const isLoading = useSelector((state: RootState) => state.event.isLoading);
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const [invalidAt, setInvalidAt] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<string>("");

  useEffect(() => {
    dispatch(getNews());
  }, []);

  const deleteNewsHandle = (id: number) => {
    dispatch(deleteNews(id));
  };
  const moveNewsToUpdate = (news: Types.News) => {
    setSubject(news.subject);
    setContent(news.content);
    setInvalidAt(news.invalidAt);
    setId(news.id);
    setCreatedAt(news.createdAt);
    setLink(news.link);
    setUpdateModalIsOpen(true);
  };
  const handleCreateForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      createNews({
        subject: subject,
        content: content,
        link: link,
        invalidAt: invalidAt,
      })
    );
    closeCreateModal();
  };

  const handleUpdateForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      updateNews({
        id: id,
        subject: subject,
        content: content,
        invalidAt: invalidAt,
        link: link,
        createdAt: createdAt,
      })
    );
    closeUpdateModal();
  };
  const resetForm = () => {
    setSubject("");
    setContent("");
    setInvalidAt("");
    setLink("");
  };
  const closeCreateModal = () => {
    setModalIsOpen(false);
    resetForm();
  };
  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
    resetForm();
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
            Manage Your News
            <FcNews className="mx-2 mb-2" />
          </h6>
          <hr />
        </div>
        <div className="mb-3">
          <button
            className="btn btn-outline-primary py-2 px-4"
            onClick={() => {
              setModalIsOpen(true);
            }}
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
                                moveNewsToUpdate(news);
                              }}
                            />
                            <AiOutlineDelete
                              className="mx-2 p-0 btn btn-outline-primary"
                              onClick={() => {
                                deleteNewsHandle(news.id);
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
                          <span className="blockquote-footer mx-3">
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
            <div className="col-8 mx-auto">
              <form
                className="mx-3"
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
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <AiOutlineLink size="1.3em" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
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
      <Modal
        show={updateModalIsOpen}
        onHide={() => closeUpdateModal()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        animation={true}
        centered
      >
        <Modal.Header>
          Update News
          <AiOutlineClose size="1.3em" onClick={() => closeUpdateModal()} />
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-8 mx-auto">
              <form
                className="mx-3"
                onSubmit={(event) => handleUpdateForm(event)}
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
                    value={invalidAt}
                    onChange={(e) => setInvalidAt(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <AiOutlineLink size="1.3em" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
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
                      Update News
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
