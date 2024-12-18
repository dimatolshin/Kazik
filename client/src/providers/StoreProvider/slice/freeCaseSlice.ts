import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FreeCaseScheme,
  FreeCaseSpinsType,
  FreeCaseType,
} from "../../../types/FreeCase";

const initialState: FreeCaseScheme = {};

export const freeCaseSlice = createSlice({
  name: "freecase",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<FreeCaseType[]>) => {
      state.case = action.payload;
    },
    addSpins: (state, action: PayloadAction<FreeCaseSpinsType>) => {
      state.user = action.payload;
    },
    minusSpins: (state) => {
      if (state.user && state.user.key_free_case > 0) {
        state.user.key_free_case -= 1;
      }
    },
    plusSpins: (state) => {
      if (state.user) {
        state.user.key_free_case += 1;
      }
    },
  },
});

export const { actions: freeCaseActions } = freeCaseSlice;
export const { reducer: freeCaseReducer } = freeCaseSlice;
