import { createReducer } from '@reduxjs/toolkit'

export default handleChangeURL = createReducer('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100', {
    HANDLECHANGEURL: (state, action) => action.payload,
  })