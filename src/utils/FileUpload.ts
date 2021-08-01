export const fileUploadHandler = (selectedFile:File) => {
    const formData = new FormData();
    if (selectedFile?.name.match(/\.jpe?g|png|gif|webp/)) {
      formData.append("file", selectedFile);
      formData.append("docType", "Image");
      /*axiosFormData
        .post("/file/upload", formData)
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.log("Error:", error.message);
        });*/
      console.log(formData);
    } else {
      console.log("file must be image");
    }
  };