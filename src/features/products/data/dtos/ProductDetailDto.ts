
import { IsArray, IsEmpty, IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, isEnum } from "class-validator"

export class ProductDetailDto {

    productId: string
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    condition: string

    @IsNotEmpty()
    @IsNumber()
    regularPrice: number

    images: any[]

    @IsOptional()
    @IsString()
    size: string

    colors: string

    sizes: string

    @IsOptional()
    @IsNumber()
    quantity: number

    @IsOptional()
    @IsString()
    features: string

    @IsOptional()
    @IsString()
    model: string

}