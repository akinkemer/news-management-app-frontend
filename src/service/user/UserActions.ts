import { axiosXWWW,axiosJSON,axiosXWWWwithToken } from "../axios";
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
    roleList: {name:string,id:number}[];
  };
  message: string;
  success: boolean;
}

export const login = (userLoginForm: ParsedUrlQueryInput) => {
  return (dispatch: Dispatch<Types.Action>) => {
    dispatch(actionStart());
    axiosXWWW
      .post<LoginResponse>("/login",querystring.stringify(userLoginForm))
      .then((response) => {
        dispatch(actionSuccess("Login Successful"));
        localStorage.setItem("jwtToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        dispatch(actionStart());

        axiosXWWWwithToken(response.data.access_token)
          .get<CurrentUserResponse>(`/user/getUser?userName=${userLoginForm.userName}`)
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
            console.log(error.message)
            axiosXWWWwithToken(response.data.refresh_token).get("/token/refresh").then((response) => {
              localStorage.setItem("jwtToken", response.data.access_token);
              localStorage.setItem("refreshToken", response.data.refresh_token);
              login(userLoginForm);
            })
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
    localStorage.removeItem("refreshToken");
    dispatch(actionLogout());
    dispatch(actionSuccess("Logout Successful"));
  };
};

export const register = (registerForm: Types.RegisterForm) => {
  return (dispatch: Dispatch<Types.Action>) => {
    dispatch(actionStart());
    axiosJSON.post<Types.RegisterResponse>("/user/save", registerForm).then((response) => {
      if (response.data.message==="Username already taken") {
        dispatch(actionFailed("Username already taken"))
      }
      else {
        dispatch(actionSuccess("User registered successfully"))
      }
    }).catch((error) => {
      console.log(error);
      dispatch(actionFailed(error.message))
    });
  }
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
