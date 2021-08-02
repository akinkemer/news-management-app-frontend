import { combineReducers } from "redux";
import UserReducer from "./user/UserReducer";
import EventReducer from "./event/EventReducer";

const reducers = combineReducers({
  event: EventReducer,
  user: UserReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
