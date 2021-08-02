export interface State {
  username: string;
  fullName: string;
  isLoggedIn: boolean;
  isLoginSuccess: boolean;
  isLoading: boolean;
  userRoles: {name:string,id:number}[];
  message: string;
}

export interface UserLoginPayload {
  username: string;
  fullName: string;
  userRoles: {name:string,id:number}[];
}
export interface UserLoginForm {
  userName: string;
  password: string;
}
export interface RegisterForm {
  userName: string;
  name: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  success: boolean,
  message: string,
  data:string[]|null
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

export interface LoginAction {
  type: "login";
  payload: UserLoginPayload;
}
export interface LoginSuccessAction {
  type: "loginSuccess";
}
export interface LogoutAction {
  type: "logout";
}

export type Action =
  | LoginAction
  | LogoutAction
  | LoginSuccessAction
  | ActionStart
  | ActionFailed
  | ActionSuccess;
