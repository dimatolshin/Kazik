import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateScheme } from "./StateScheme";
import { casinoReducer } from "../slice/casinoSlice";
import { freeCaseReducer } from "../slice/freeCaseSlice";
import { wheelFortyneReducer } from "../slice/wheelFortyneSlice";
import { dailyBonusReducer } from "../slice/dailyBonusSlice";

export function createReduxStore(initialState?: StateScheme) {
  const rootReducer: ReducersMapObject<StateScheme> = {
    allCasino: casinoReducer,
    allCase: freeCaseReducer,
    allWheel: wheelFortyneReducer,
    dailuBonus: dailyBonusReducer,
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}
