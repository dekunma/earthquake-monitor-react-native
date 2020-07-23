import { createReducer } from '@reduxjs/toolkit'

export default handleChangeDetail = createReducer({}, {
    HANDLECHANGEDETAIL: (state, action) => action.payload,
  })