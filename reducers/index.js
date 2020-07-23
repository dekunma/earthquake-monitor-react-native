import { combineReducers } from "redux";
import detailReducer from './detailReducer'
import geometryReducer from './geometryReducer'

export default combineReducers({
    details:detailReducer,
    geometry:geometryReducer
});
