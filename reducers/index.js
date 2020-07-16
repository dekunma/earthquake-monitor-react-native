import { combineReducers } from "redux";
import testPlaceReducer from './testPlaceReducer'

export default combineReducers({
    place:testPlaceReducer
});
