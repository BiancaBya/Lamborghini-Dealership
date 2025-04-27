export interface PurchaseDto {
    client: { email: string };
    car: {
        model: string;
        year: number;
        horsepower: number;
        price: number;
    };
}


