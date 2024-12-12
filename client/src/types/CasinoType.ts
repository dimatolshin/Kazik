export interface CasinoType {
    user: UserType;
    peoples_top: CasinoCardType[];
    top_10_casino: CasinoCardType[];
    offers_of_week: CasinoCardType[];
}

interface UserType {
    tg_id: string;
    tg_name: string;
}

export interface CasinoCardType {
    name: string;
    rating: number;
    free_spin: number;
    dep: number;
    money: number;
    url: string;
    count_of_visit_people: number;
    promo_code: string;
    logo_url: string;
    banner_url?: string;
}

export interface CasinoScheme {
    casino?: CasinoType
}