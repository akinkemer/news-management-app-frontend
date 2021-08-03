import { useState, useEffect } from "react";
import { Animate } from "react-simple-animate";
import { useDispatch, useSelector } from "react-redux";
import { FcAdvertising, FcAddImage } from "react-icons/fc";
import * as Types from "../service/event/ActionTypes";
import { RootState } from "../service/index";
import { Modal } from "react-bootstrap";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
} from "../service/event/EventActions";

function ManageAnnounsPage() {

  const isLoading = useSelector((state: RootState) => state.event.isLoading);
  const announcements = useSelector(
    (state: RootState) => state.event.announcements
  );

  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [invalidAt, setInvalidAt] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<string>("");

  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAnnouncements());
  }, []);

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
    if (event.target.files![0]?.name.match(/\.jpe?g|png|gif|webp/)) {
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  const handleAddNewForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageError) {
      dispatch(
        createAnnouncement(
          {
            subject: subject,
            content: content,
            imageLink: "",
            invalidAt: invalidAt,
          },
          selectedFile
        )
      );
      resetForm();
      setModalIsOpen(false);
    }
  };
  const resetForm = () => {
    setSubject("");
    setContent("");
    setInvalidAt("");
    setImageLink("");
  };
  const deleteAnnounc = (id: number) => {
    dispatch(deleteAnnouncement(id));
  };
  const updateAnnounc = (announcement: Types.Announcement) => {
    setSubject(announcement.subject);
    setContent(announcement.content);
    setInvalidAt(announcement.invalidAt);
    setImageLink(announcement.imageLink);
    setId(announcement.id);
    setCreatedAt(announcement.createdAt);
    setUpdateModalIsOpen(true);
  };
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      updateAnnouncement(
        {
          id: id,
          subject: subject,
          content: content,
          invalidAt: invalidAt,
          imageLink: imageLink,
          createdAt: createdAt,
        },
        selectedFile
      )
    );
    resetForm();
    setUpdateModalIsOpen(false);
  };
  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
    resetForm();
  };
  const closeAddModal = () => {
    setModalIsOpen(false);
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
            Manage Your Announcements
            <FcAdvertising className="mx-2 mb-2" />
          </h6>
          <hr />
        </div>
        <div className="mb-3">
          <button
            className="btn btn-outline-primary py-2 px-4"
            onClick={() => setModalIsOpen(true)}
          >
            Create Announcement
            <AiOutlinePlus size="1.3em" className="mx-1 mb-1" />
          </button>
        </div>
        <div className="card mb-3">
          <div className="card-header">Announcements</div>
          <div className="card-body">
            <div className="row">
              {announcements.length > 0 &&
                announcements.map((announc) => {
                  return (
                    <div className="col-md-4" key={announc.id}>
                      <div className="card mb-3">
                        <div className="card-header">
                          <div className="d-flex justify-content-end">
                            <AiOutlineEdit
                              className="mx-2 p-0 btn btn-outline-primary"
                              size="2em"
                              onClick={() => {
                                updateAnnounc(announc);
                              }}
                            />
                            <AiOutlineDelete
                              className="mx-2 p-0 btn btn-outline-primary"
                              onClick={() => {
                                deleteAnnounc(announc.id);
                              }}
                              size="2em"
                            />
                          </div>
                        </div>
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
                })}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={modalIsOpen}
        onHide={() => closeAddModal()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        animation={true}
        centered
      >
        <Modal.Header>
          Add New Announcement{" "}
          <AiOutlineClose size="1.3em" onClick={() => closeAddModal()} />
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <div className="text-center mb-3">
                <FcAddImage size="9em" />
              </div>
              <div className="mx-3 mt-3">
                <label htmlFor="inputUserName" className="form-label">
                  Upload a image
                </label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(event) => fileSelectedHandler(event)}
                />
                {imageError ? (
                  <span className="text-danger">The file must be an image</span>
                ) : null}
              </div>
            </div>
            <div className="col-6">
              <form
                className="mx-3 mt-3"
                onSubmit={(event) => handleAddNewForm(event)}
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
                      Add New
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
          Update Announcement
          <AiOutlineClose size="1.3em" onClick={() => closeUpdateModal()} />
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <div className="text-center mb-3">
                <img src={imageLink} className="card-img-top" />
              </div>
              <div className="mx-3 mt-3">
                <label htmlFor="inputUserName" className="form-label">
                  Update the image
                </label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(event) => fileSelectedHandler(event)}
                />
              </div>
            </div>
            <div className="col-6">
              <form
                className="mx-3 mt-3"
                onSubmit={(event) => {
                  handleUpdate(event);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="inputUserName" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
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
                    value={invalidAt}
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
                      Update
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

export default ManageAnnounsPage;
