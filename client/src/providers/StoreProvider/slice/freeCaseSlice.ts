import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FreeCaseScheme, FreeCaseType } from '../../../types/FreeCase'

const initialState: FreeCaseScheme = {}

export const freeCaseSlice = createSlice({
  name: 'freecase',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<FreeCaseType[]>) => {
      state.case = action.payload
    },
  },
})

export const { actions: freeCaseActions } = freeCaseSlice
export const { reducer: freeCaseReducer } = freeCaseSlice
