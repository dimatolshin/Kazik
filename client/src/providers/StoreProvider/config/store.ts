import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateScheme } from "./StateScheme";
import { casinoReducer } from "../slice/casinoSlice";

export function createReduxStore(initialState?: StateScheme) {
  const rootReducer: ReducersMapObject<StateScheme> = {
    allCasino: casinoReducer,
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}
