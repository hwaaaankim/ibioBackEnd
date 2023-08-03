import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class ProductVariantDto { 

    productDetailId: string


    @IsString()
    @IsOptional()
    productSizeId: string

    @IsString()
    @IsOptional()
    productColorId: string

    @IsOptional()
    @IsNumber()
    quantity: number

    @IsOptional()
    @IsNumber()
    colorPrice: number

    @IsOptional()
    @IsNumber()
    sizePrice: number

    @IsBoolean()
    isAvailable: boolean

}