
import { combineReducers } from "redux";
import UserReducer from "./user/UserReducer";
import EventReducer from "./event/EventReducer";

const reducers = combineReducers({
  user: UserReducer,
  event:EventReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>
