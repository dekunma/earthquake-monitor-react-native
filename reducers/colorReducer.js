import { createReducer } from '@reduxjs/toolkit'

export default handleChangeColor = createReducer('#8E8E92', {
    HANDLECHANGECOLOR: (state, action) => action.payload
})