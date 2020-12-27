import { combineReducers } from "redux";
import detailReducer from './detailReducer'
import geometryReducer from './geometryReducer'
import colorReducer from './colorReducer'

export default combineReducers({
    details:detailReducer,
    geometry:geometryReducer,
    color:colorReducer,
});
