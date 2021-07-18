import counterReducer from "./counter_reducer";
import personReducer from "./person_reducer";
import { combineReducers } from "redux";

export default combineReducers({
    count:counterReducer,
    person:personReducer
})