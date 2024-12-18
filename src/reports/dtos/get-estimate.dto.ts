import { IsString, IsNumber, Min, Max, IsLatitude, IsLongitude } from "class-validator";
import { Transform } from 'class-transformer'

export class GetEstimateDto{
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({value})=> parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    @Transform(({value})=> parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;

    @Transform(({value})=> parseFloat(value))
    @IsNumber()
    @IsLatitude()
    lat: number;

    @Transform(({value})=> parseFloat(value))
    @IsNumber()
    @IsLongitude()
    lng: number;
}