import { IsArray, IsEmpty, IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, isEnum } from "class-validator"

export enum ProductCategoryEnum { SHOES, SOMETHING, CARS }

export class ProductDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    brand: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    @IsString()
    category: string

    @IsNumberString()
    @IsOptional()
    stock: number

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    condition: string

    @IsEmpty()
    shopId: string

    @IsNotEmpty()
    @IsNumberString()
    price: number

    images: any[]

    @IsOptional()
    @IsString()
    size: string

    colors: string

    @IsOptional()
    @IsString()
    motor_type: string

    @IsOptional()
    @IsString()
    transmission: string

    @IsOptional()
    @IsString()
    year: string

    @IsOptional()
    @IsString()
    fuel: string



}