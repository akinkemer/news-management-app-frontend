import axios from "axios";
import { Dispatch } from "redux";
import * as Types from "./ActionTypes";

const baseURL = "http://localhost:8080/api/v1";

const contentType = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const contentTypeWithJWT = (token: string) => {
  return {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  };
};

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

export const login = (userLoginForm: Types.UserLoginForm) => {
  return (dispatch: Dispatch<Types.Action>) => {
    dispatch(actionStart());
    const params = new URLSearchParams();
    params.append("username", userLoginForm.username);
    params.append("password", userLoginForm.password);
    axios
      .post<LoginResponse>(`${baseURL}/login`, params, contentType)
      .then((response) => {
        dispatch(actionSuccess("Login Successful"));
        localStorage.setItem("jwtToken", response.data.access_token);
        dispatch(actionStart());

        axios
          .get<CurrentUserResponse>(
            `${baseURL}/user/currentUser`,
            contentTypeWithJWT(response.data.access_token)
          )
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
