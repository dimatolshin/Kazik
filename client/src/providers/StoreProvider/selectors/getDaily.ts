import { StateScheme } from "../config/StateScheme";

export const getDay = (state: StateScheme) => state.dailuBonus.bonus
export const getTakeDay = (state: StateScheme) => state.dailuBonus.user