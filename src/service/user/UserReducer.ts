import * as Types from "./ActionTypes";
interface State {
  username: string;
  fullName: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  userRoles: string[];
  message: string;
}

const initalState: State = {
  username: "",
  fullName: "",
  isLoggedIn: false,
  isLoading: false,
  userRoles: [],
  message: "",
};

const reducer = (state: State = initalState, action: Types.Action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        username: action.payload.username,
        userRoles: action.payload.userRoles,
        fullName: action.payload.fullName
      };
    case "logout":
      return {
        ...state,
        userName: "",
        isLoggedIn: false,
        userRoles: [],
      };
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
