
import { combineReducers } from "redux";
import UserReducer from "./user/UserReducer";

const reducers = combineReducers({
  user: UserReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>
