import * as Types from "./ActionTypes";

const initalState: Types.State = {
  news: [],
  announcements: [],
  isLoading: false,
  message: "",
};
const reducer = (
  state: Types.State = initalState,
  action: Types.Action
): Types.State => {
  switch (action.type) {
    case "getNews":
      return { ...state, news: action.payload };
    case "getAnnouncements":
      return { ...state, announcements: action.payload };
    case "deleteNews":
      return {
        ...state,
        news: state.news.filter((n) => n.id !== action.payload),
      };
    case "deleteAnnouncement":
      return {
        ...state,
        announcements: state.announcements.filter(
          (a) => a.id !== action.payload
        ),
      };
    case "updateAnnouncement":
      return {
        ...state,
        announcements: state.announcements.map((announ) => {
          return announ.id === action.payload.id ? action.payload : announ;
        }),
      };
    case "updateNews":
      return {
        ...state,
        news: state.news.map((news) => {
          return news.id === action.payload.id ? action.payload : news;
        }),
      };
    case "createAnnouncement":
      return {
        ...state,
        announcements: [...state.announcements, action.payload],
      };
    case "addAnnouncFromSocket":
      return {...state,
        announcements: [...state.announcements, action.payload]};
    case "createNews":
      return { ...state, news: [...state.news, action.payload] };
    case "start":
      return { ...state, isLoading: true, message: "" };
    case "success":
      return { ...state, isLoading: false, message: action.payload };
    case "failed":
      return { ...state, isLoading: false, message: action.payload };
    default:
      return state;
  }
};

export default reducer;
