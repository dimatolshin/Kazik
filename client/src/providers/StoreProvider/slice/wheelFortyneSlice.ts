import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  WheelFortyneScheme,
  WheelFortyneSpinsType,
  WheelFortyneType,
} from "../../../types/WheelFortune";

const initialState: WheelFortyneScheme = {};

export const wheelFortyneSlice = createSlice({
  name: "wheelFortyne",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<WheelFortyneType[]>) => {
      state.wheel = action.payload;
    },
    addSpins: (state, action: PayloadAction<WheelFortyneSpinsType>) => {
      state.user = action.payload;
    },
    minusSpins: (state) => {
      if (state.user && state.user.key_wheel_of_fortune > 0) {
        state.user.key_wheel_of_fortune -= 1;
      }
    },
    plusSpins: (state) => {
      if (state.user) {
        state.user.key_wheel_of_fortune += 1;
      }
    },
  },
});

export const { actions: wheelFortyneActions } = wheelFortyneSlice;
export const { reducer: wheelFortyneReducer } = wheelFortyneSlice;
