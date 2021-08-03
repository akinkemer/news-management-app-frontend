import { Dispatch } from "redux";
import * as Types from "./ActionTypes";
import { axiosFormData, axiosJSON } from "../axios";
import axios from "axios";

export const createAnnouncement = (
  createAnnouncementForm: Types.CreateAnnouncementForm,
  selectedFile: File | null
) => {
  return (dispatch: Dispatch<Types.Action>) => {
    dispatch(actionStart());
    const formData = new FormData();
    let imageLink: string = "";
    formData.append("file", selectedFile!);
    formData.append("docType", "Image");
    axiosFormData
      .post<Types.ImageSavedResponse>("/file/upload", formData)
      .then((response) => {
        imageLink = response.data.data.fileUrl;
        createAnnouncementForm.imageLink = imageLink;
        axiosJSON
          .post<Types.AnnouncementSavedResponse>(
            "/announcement/save",
            createAnnouncementForm
          )
          .then((response) => {
            dispatch(actionCreateAnnounc(response.data.data));
            dispatch(actionSuccess("Success"));
          })
          .catch(() => {
            dispatch(actionFailed("Failed to create announcement"));
          });
      })
      .catch(() => {
        dispatch(actionFailed("Failed to load image"));
      });
  };
};
export const getAnnouncements = () => {
  return (dispatch: Dispatch<Types.Action>) => {
    dispatch(actionStart());
    axiosJSON
      .get<{ data: Types.Announcement[] }>("/announcement/getAll")
      .then((response) => {
        dispatch(actionGetAnnouns(response.data.data));
        dispatch(actionSuccess("Announcements fetched successfully"));
      })
      .catch((error) => {
        console.log(error);
        dispatch(actionFailed("Failed to fetch announcements"));
      });
  };
};
export const deleteAnnouncement = (id: number) => {
  return (dispatch: Dispatch<Types.Action>) => {
    axiosJSON
      .delete("/announcement/delete/" + id)
      .then(() => {
        dispatch(actionDeleteAnnounc(id));
        dispatch(actionSuccess("Announcement deleted successfully"));
      })
      .catch(() => {
        dispatch(actionFailed("Failed to delete announcement"));
      });
  };
};
export const updateAnnouncement = (
  announcement: Types.Announcement,
  selectedFile: File | null
) => {
  return (dispatch: Dispatch<Types.Action>) => {
    dispatch(actionStart());
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("file", selectedFile!);
      formData.append("docType", "Image");
      axiosFormData
        .post<Types.ImageSavedResponse>("/file/upload", formData)
        .then((response) => {
          announcement.imageLink = response.data.data.fileUrl;
        })
        .catch(() => {
          dispatch(actionFailed("Failed to load image"));
        });
    }
    axiosJSON
      .put<Types.Announcement>(
        `/announcement/update/${announcement.id}`,
        announcement
      )
      .then((response) => {
        dispatch(actionUpdateAnnounc(announcement));
        dispatch(actionSuccess("Success to delete announcement"));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
  };
};

const actionStart = (): Types.Action => {
  return { type: "start" };
};
const actionFailed = (message: string): Types.Action => {
  return { type: "failed", payload: message };
};
const actionSuccess = (message: string): Types.Action => {
  return { type: "success", payload: message };
};
const actionCreateAnnounc = (
  announcement: Types.Announcement
): Types.Action => {
  return { type: "createAnnouncement", payload: announcement };
};
const actionGetAnnouns = (
  announcements: Types.Announcement[]
): Types.Action => {
  return { type: "getAnnouncements", payload: announcements };
};

const actionDeleteAnnounc = (id: number): Types.Action => {
  return { type: "deleteAnnouncement", payload: id };
};
const actionUpdateAnnounc = (announc:Types.Announcement): Types.Action => {
  return { type: "updateAnnouncement", payload: announc };
};
