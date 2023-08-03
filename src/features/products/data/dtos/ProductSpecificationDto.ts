import { IsNotEmpty, IsString } from "class-validator"


export class ProductSpecificationDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    value: string

}