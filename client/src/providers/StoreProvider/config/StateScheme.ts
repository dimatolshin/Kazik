import { CasinoScheme } from "../../../types/CasinoType";
import { DailyBonusType } from "../../../types/DailyBonusType";
import { FreeCaseScheme } from "../../../types/FreeCase";
import { WheelFortyneScheme } from "../../../types/WheelFortune";

export interface StateScheme {
    allCasino: CasinoScheme;
    allCase: FreeCaseScheme;
    allWheel: WheelFortyneScheme;
    dailuBonus: DailyBonusType;
}
