import { IsArray, IsEmpty, IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, isEnum } from "class-validator"
import { ProductStatusEnum } from "../models/ProductEntity"

export enum ProductCategoryEnum { SHOES, SOMETHING, CARS }

export class ProductDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEnum(ProductStatusEnum)
    @IsNotEmpty()
    status: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    @IsString()
    categoryId: string

    code: string
    colors: string
    sizes: string
    

}