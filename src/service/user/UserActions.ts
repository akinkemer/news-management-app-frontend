import { axiosWithJwt, axiosCustom } from "../axios";
import querystring, { ParsedUrlQueryInput } from "querystring"
import { Dispatch } from "redux";
import * as Types from "./ActionTypes";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
interface CurrentUserResponse {
  data: {
    username: string;
    fullName: string;
    roleList: string[];
  };
  message: string;
  success: boolean;
}

export const login = (userLoginForm: ParsedUrlQueryInput) => {
  return (dispatch: Dispatch<Types.Action>) => {
    dispatch(actionStart());
    axiosCustom
      .post<LoginResponse>("/login",querystring.stringify(userLoginForm))
      .then((response) => {
        dispatch(actionSuccess("Login Successful"));
        localStorage.setItem("jwtToken", response.data.access_token);
        dispatch(actionStart());

        axiosWithJwt
          .get<CurrentUserResponse>("/user/currentUser")
          .then((response) => {
            dispatch(actionSuccess("User fetched successfully"));
            dispatch(
              actionLogin({
                username: response.data.data.username,
                fullName: response.data.data.fullName,
                userRoles: response.data.data.roleList,
              })
            );
            dispatch(actionLoginSuccess());
          })
          .catch((error) => {
            dispatch(actionFailed(error.message));
          });
      })
      .catch((error) => {
        dispatch(actionFailed(error.message));
        console.log(error);
      });
  };
};
export const logout = () => {
  return (dispatch: Dispatch<Types.Action>) => {
    dispatch(actionStart());
    localStorage.removeItem("jwtToken");
    dispatch(actionLogout());
    dispatch(actionSuccess("Logout Successful"));
  };
};

const actionStart = (): Types.Action => {
  return { type: "start" };
};
const actionFailed = (message: string): Types.Action => {
  return { type: "failed", payload: message };
};
const actionSuccess = (message: string): Types.Action => {
  return { type: "failed", payload: message };
};
const actionLogin = (payload: Types.UserLoginPayload): Types.Action => {
  return { type: "login", payload: payload };
};
const actionLogout = (): Types.Action => {
  return { type: "logout" };
};
const actionLoginSuccess = (): Types.Action => {
  return { type: "loginSuccess" };
};
