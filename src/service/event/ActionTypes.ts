export interface State {
  news: News[];
  announcements: Announcement[];
  isLoading: boolean;
  message: string;
}

export interface News {
  id: number;
  subject: string;
  content: string;
  invalidAt: string;
  createdAt: string;
  link: string;
}
export interface Announcement {
  id: number;
  subject: string;
  content: string;
  invalidAt: string;
  createdAt: string;
  imageLink: string;
}
export interface CreateNewsForm {
  subject: string;
  content: string;
  invalidAt: string;
  link: string;
}
export interface CreateAnnouncementForm {
  subject: string;
  content: string;
  invalidAt: string;
  imageLink: string;
}

export interface ActionStart {
  type: "start";
}
export interface ActionFailed {
  type: "failed";
  payload: string;
}
export interface ActionSuccess {
  type: "success";
  payload: string;
}

export interface ActionGetNews {
  type: "getNews";
  payload: News[];
}
export interface ActionDeleteNews {
  type: "deleteNews";
  payload: number;
}

export interface ActionGetAnnouncements {
  type: "getAnnouncements";
  payload: Announcement[];
}
export interface ActionDeleteAnnouncement {
  type: "deleteAnnouncement";
  payload: number;
}

export interface ActionUpdateAnnouncement {
  type: "updateAnnouncement";
  payload: Announcement;
}
export interface ActionUpdateNews {
  type: "updateNews";
  payload: News;
}

export interface ActionCreateAnnouncement {
  type: "createAnnouncement";
  payload: Announcement;
}
export interface ActionCreateNews {
  type: "createNews";
  payload: News;
}

export interface ImageSavedResponse {
  data: {
    fileName: string;
    fileUrl: string;
  };
}

export interface NewsSavedResponse {
  data: {
    id: number;
    subject: string;
    content: string;
    invalidAt: string;
    createdAt: string;
    link: string;
    success: boolean;
  };
}
export interface AnnouncementSavedResponse {
  data: {
    id: number;
    subject: string;
    content: string;
    invalidAt: string;
    createdAt: string;
    imageLink: string;
    success: boolean;
  };
}

export type Action =
  | ActionStart
  | ActionFailed
  | ActionSuccess
  | ActionGetNews
  | ActionGetAnnouncements
  | ActionDeleteNews
  | ActionDeleteAnnouncement
  | ActionUpdateAnnouncement
  | ActionUpdateNews
  | ActionCreateAnnouncement
  | ActionCreateNews;
