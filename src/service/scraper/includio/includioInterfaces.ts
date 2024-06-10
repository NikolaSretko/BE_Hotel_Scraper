// src/types.ts

export interface ScrapedPrice {
    typ: string;
    size: string;
    price: string;
    date: Date;
}

export interface HotelDetails {
    name?: string;
    stars?: string;
    roomTypes?: string[];
    breakfastIncluded?: boolean;
    pricePerNight: ScrapedPrice[];
    pricePerNightFuture: ScrapedPrice[];
}