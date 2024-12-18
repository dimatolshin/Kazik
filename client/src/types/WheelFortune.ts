export interface WheelFortyneType {
    id: number;
    text: string;
    promo_code: string;
    count: number;
    image: string;
    image_without_background_url: string;
    url_product: string;
    chance: number;
}

export interface WheelFortyneSpinsType {
    key_wheel_of_fortune: number
}

export interface WheelFortyneScheme {
    wheel?: WheelFortyneType[];
    user?: WheelFortyneSpinsType
}