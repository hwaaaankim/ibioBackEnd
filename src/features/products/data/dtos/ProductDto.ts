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

    code: string

}