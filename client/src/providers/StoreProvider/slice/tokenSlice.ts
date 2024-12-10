import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TokenScheme } from '../../../types/TokenType'

const initialState: TokenScheme = {
  token: localStorage.getItem('userToken') ?? undefined,
}
// localStorage.getItem('userToken') ?? undefined
export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    initAuthData: (state, action: PayloadAction<string>) => {
      localStorage.setItem('userToken', action.payload)
      state.token = action.payload
    },
    logout: (state) => {
      state.token = undefined
      localStorage.removeItem('userToken')
    },
  },
})

export const { actions: tokenActions } = tokenSlice
export const { reducer: tokenReducer } = tokenSlice
