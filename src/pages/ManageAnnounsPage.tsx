import { useState } from "react";
import { Animate } from "react-simple-animate";
import { useDispatch, useSelector } from "react-redux";
import { FcAdvertising, FcAddImage } from "react-icons/fc";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { Modal } from "react-bootstrap";
import {
  createAnnouncement,
  getAnnouncements,
} from "../service/event/EventActions";
import { RootState } from "../service/index";
import { useEffect } from "react";

function ManageAnnounsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.event.isLoading);
  const message = useSelector((state: RootState) => state.event.message);
  const announcements = useSelector(
    (state: RootState) => state.event.announcements
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [invalidAt, setInvalidAt] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAnnouncements());
  }, []);

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
  };

  const handleAddNewForm = (event: React.FormEvent<HTMLFormElement>) => {
    if (selectedFile?.name.match(/\.jpe?g|png|gif|webp/)) {
    }
    event.preventDefault();
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
    setModalIsOpen(false);
    setSelectedFile(null);
    setSubject("");
    setContent("");
    setInvalidAt("");
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
            Add New Announcement
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
                            <AiOutlineEdit className="mx-2" size="1.8em" />
                            <AiOutlineDelete className="mx-2" size="1.8em" />
                          </div>
                        </div>
                        <img
                          src={announc.imageLink}
                          className="card-img-top"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{announc.subject}</h5>
                          <p className="card-text">{announc.content}</p>
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
        onHide={() => setModalIsOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        animation={true}
        centered
      >
        <Modal.Header>
          Add New Announcement{" "}
          <AiOutlineClose size="1.3em" onClick={() => setModalIsOpen(false)} />
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
                  id="formFile"
                  onChange={(event) => fileSelectedHandler(event)}
                />
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
                    id="inputUserName"
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
                    id="contentText"
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
                    id="date"
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
    </Animate>
  );
}

export default ManageAnnounsPage;
