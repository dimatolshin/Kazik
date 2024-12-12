import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CasinoScheme, CasinoType } from '../../../types/CasinoType'

const initialState: CasinoScheme = {}

export const casinoSlice = createSlice({
  name: 'casino',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<CasinoType>) => {
      state.casino = action.payload
    },
    
  },
})

export const { actions: casinoActions } = casinoSlice
export const { reducer: casinoReducer } = casinoSlice
