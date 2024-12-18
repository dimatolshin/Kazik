export interface FreeCaseType {
    id: number;
    text: string;
    promo_code: string;
    count: number;
    image: string;
    image_without_background_url: string;
    url_product: string;
    chance: number;
}

export interface FreeCaseSpinsType {
    key_free_case: number
}

export interface FreeCaseScheme {
    case?: FreeCaseType[]
    user?: FreeCaseSpinsType
}