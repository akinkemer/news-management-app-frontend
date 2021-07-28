export interface UserLoginPayload {
  username: string;
  fullName: string;
  userRoles: string[];
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

export interface LogoutAction {
  type: "logout";
}

export type Action =
  | LoginAction
  | LogoutAction
  | ActionStart
  | ActionFailed
  | ActionSuccess;
