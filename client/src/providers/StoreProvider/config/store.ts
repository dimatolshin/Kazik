import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateScheme } from "./StateScheme";
import { casinoReducer } from "../slice/casinoSlice";
import { freeCaseReducer } from "../slice/freeCaseSlice";

export function createReduxStore(initialState?: StateScheme) {
  const rootReducer: ReducersMapObject<StateScheme> = {
    allCasino: casinoReducer,
    allCase: freeCaseReducer,
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}
