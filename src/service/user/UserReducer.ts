import * as Types from "./ActionTypes";

const getUserRoles = () => {
  const roles: string | null = localStorage.getItem("userRoles");
  if (roles && roles.length > 0) {
    return JSON.parse(localStorage.getItem("userRoles") || "{}");
  } else {
    return [];
  }
}
const initalState: Types.State = {
  username: localStorage.getItem("username") || "",
  fullName: localStorage.getItem("fullName") || "",
  isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
  isLoading: false,
  isLoginSuccess: false,
  userRoles: getUserRoles(),
  message: "",
};

const reducer = (
  state: Types.State = initalState,
  action: Types.Action
): Types.State => {
  switch (action.type) {
    case "login":
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("fullName", action.payload.fullName);
      localStorage.setItem(
        "userRoles",
        JSON.stringify(action.payload.userRoles)
      );
      localStorage.setItem("isLoggedIn", String(true));
      return {
        ...state,
        username: action.payload.username,
        userRoles: action.payload.userRoles,
        fullName: action.payload.fullName,
      };
    case "logout":
      localStorage.removeItem("username");
      localStorage.removeItem("fullName");
      localStorage.removeItem("userRoles");
      localStorage.removeItem("isLoggedIn");
      return {
        ...state,
        fullName: "",
        username: "",
        isLoggedIn: false,
        userRoles: [],
      };
    case "loginSuccess":
      return { ...state, isLoginSuccess: true, isLoggedIn: true };
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
