import { CasinoScheme } from "../../../types/CasinoType";
import { FreeCaseScheme } from "../../../types/FreeCase";
import { WheelFortyneScheme } from "../../../types/WheelFortune";

export interface StateScheme {
    allCasino: CasinoScheme;
    allCase: FreeCaseScheme;
    allWheel: WheelFortyneScheme;
}
