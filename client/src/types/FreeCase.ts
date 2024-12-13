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

export interface FreeCaseScheme {
    case?: FreeCaseType[]
}