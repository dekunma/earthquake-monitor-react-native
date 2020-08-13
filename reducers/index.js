import { combineReducers } from "redux";
import detailReducer from './detailReducer'
import geometryReducer from './geometryReducer'
import colorReducer from './colorReducer'
import URLReducer from './URLReducer'
import triggerRefreshReducer from './triggerRefreshReducer'

export default combineReducers({
    details:detailReducer,
    geometry:geometryReducer,
    color:colorReducer,
    URL:URLReducer,
    triggerRefresh: triggerRefreshReducer
});
