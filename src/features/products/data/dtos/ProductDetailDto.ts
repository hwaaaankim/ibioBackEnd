
import { IsArray, IsEmpty, IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, isEnum } from "class-validator"

export class ProductDetailDto {

    productId: string
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    condition: string

    @IsNotEmpty()
    @IsNumberString()
    regularPrice: number

    images: any[]

    @IsOptional()
    @IsString()
    size: string

    colors: string

    sizes: string

    @IsOptional()
    @IsString()
    motor_type: string

    @IsOptional()
    @IsNumber()
    quantity: number

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