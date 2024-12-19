export interface DailyBonusType {
    bonus?: BonusDay;
    user?: UserCanDaily;
}

export interface BonusDay {
    day: number;
    count_prizes: number;
}

export interface UserCanDaily {
    can_get_daly_bonus: boolean
}