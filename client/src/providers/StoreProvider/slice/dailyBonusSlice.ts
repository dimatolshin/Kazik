import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BonusDay, DailyBonusType, UserCanDaily } from "../../../types/DailyBonusType";


const initialState: DailyBonusType = {};

export const dailyBonusSlice = createSlice({
  name: "dailyBonus",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<BonusDay>) => {
      state.bonus = action.payload;
    },
    activeBtn: (state, action: PayloadAction<UserCanDaily>) => {
      state.user = action.payload;
    },
  },
});

export const { actions: dailyBonusActions } = dailyBonusSlice;
export const { reducer: dailyBonusReducer } = dailyBonusSlice;
