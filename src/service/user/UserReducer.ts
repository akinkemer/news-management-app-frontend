import * as Types from "./ActionTypes";

const initalState: Types.State = {
  username: "",
  fullName: "",
  isLoggedIn: false,
  isLoading: false,
  isLoginSuccess: false,
  userRoles: [],
  message: "",
};

const reducer = (state: Types.State = initalState, action: Types.Action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        username: action.payload.username,
        userRoles: action.payload.userRoles,
        fullName: action.payload.fullName,
      };
    case "logout":
      return {
        ...state,
        fullName:"",
        userName: "",
        isLoggedIn: false,
        userRoles: [],
      };
    case "loginSuccess":
      return { ...state,isLoginSuccessful:true, isLoggedIn: true };
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
