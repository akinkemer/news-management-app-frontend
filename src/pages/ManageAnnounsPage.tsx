import { useState } from "react";
import { Animate } from "react-simple-animate";
import { axiosFormData } from "../service/axios";
import { FcAdvertising, FcAddImage } from "react-icons/fc";

function ManageAnnounsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
  };
  const fileUploadHandler = () => {
    const formData = new FormData();
    if (selectedFile?.name.match(/\.jpe?g|png|gif|webp/)) {
      formData.append("file", selectedFile);
      formData.append("docType", "Image");
      axiosFormData
        .post("/file/upload", formData)
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.log("Error:", error.message);
        });
      console.log(formData);
    } else {
      console.log("file must be image");
    }
  };
    const handleAddNewForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fileUploadHandler();
  };

  return (
    <Animate
      play
      start={{ opacity: 0 }}
      end={{ opacity: 1 }}
      delay={0.1}
      duration={0.6}
    >
      <div className="row my-4">
        <h6 className="display-6">
          Manage Your Announcements
          <FcAdvertising className="mx-2 mb-2" />
        </h6>
        <hr />
      </div>
      <div className="card mb-3">
        <div className="card-header">Add New</div>
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
          {/*<div className="col-2">
            <button className="btn btn-primary" onClick={fileUploadHandler}>
              Upload
            </button>
            </div>*/}
          <div className="col-6">
            <form className="mx-3 mt-3" onSubmit={(event)=>handleAddNewForm(event)}>
              <div className="mb-3">
                <label htmlFor="inputUserName" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUserName"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contentText" className="form-label">
                  Content
                </label>
                <textarea className="form-control" id="contentText" required />
              </div>
              <div className="mb-3">
                <label htmlFor="contentText" className="form-label">
                  Invalidation Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  required
                />
              </div>
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-block btn-primary p-2">
                  Add New
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">Announcements</div>
      </div>
    </Animate>
  );
}

export default ManageAnnounsPage;
