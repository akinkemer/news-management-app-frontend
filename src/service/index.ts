import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import UserReducer from "./user/UserReducer";

const rootReducer = combineReducers({
  user: UserReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
