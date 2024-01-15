import { IsString, IsNumber, Min, Max, IsLatitude, isLongitude, min, IsLongitude } from "class-validator";
export class CreateReportDto{
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;

    @IsNumber()
    @IsLatitude()
    lat: number;

    @IsNumber()
    @IsLongitude()
    lng: number;
    }