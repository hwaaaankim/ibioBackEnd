import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddressDto {

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    company: string;

    @IsString()
    @IsOptional()
    addressTwo: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    postCode: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    telephone: string
  
    @IsNumber()
    @IsOptional()
    fax: number

    userId: string

}