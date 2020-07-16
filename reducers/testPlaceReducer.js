import { createReducer } from '@reduxjs/toolkit'

export default handleChangePlace = createReducer('Error', {
    CHANGEPLACE: (state, action) => action.payload,
  })