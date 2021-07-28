import axios from "axios";
import { Dispatch } from "redux";
import * as Types from "./ActionTypes";

const baseURL = process.env.REACT_APP_BASE_URL;

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const login = (userLoginForm: Types.UserLoginPayload) => {
  return (dispatch: Dispatch<Types.Action>) => {
    dispatch(actionStart());
    axios
      .post<LoginResponse>(`${baseURL}/login`, userLoginForm)
      .then((response) => {
        dispatch(actionSuccess("Login Successful"));

        localStorage.setItem("jwtToken", response.data.access_token);

        dispatch(actionStart());
        axios
          .get<Types.UserLoginPayload>(`${baseURL}/currentUser`)
          .then((response) => {
            dispatch(actionSuccess("User fetched successfully"));
            dispatch(
              actionLogin({
                username: response.data.username,
                fullName: response.data.fullName,
                userRoles: response.data.userRoles,
              })
            );
          })
          .catch((error) => {
            dispatch(actionFailed(error.message));
          });
      })
      .catch((error) => {
          dispatch(actionFailed(error.message));
      });
  };
};
export const logout = () => {
    return (dispatch: Dispatch<Types.Action>) => {
        dispatch(actionStart());
        localStorage.removeItem("jwtToken");
        dispatch(actionLogout());
        dispatch(actionSuccess("Logout Successful"));
    }
}


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
    return {type:"logout"}
}