import { createReducer } from '@reduxjs/toolkit'

export default triggerRefreshReducer = createReducer(false, {
    HANDLETRIGGERREFRESH: (state, action) => action.payload,
})