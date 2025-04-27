export interface RequestDto {
    client: { email: string };
    car: {
        model: string;
        year: number;
        horsepower: number;
        price: number;
    };
    requestType: "BUY" | "RETURN";
}


