import { createReducer } from '@reduxjs/toolkit'

export default handleChangeGeometry = createReducer({}, {
    HANDLECHANGEGEOMETRY: (state, action) => action.payload,
  })