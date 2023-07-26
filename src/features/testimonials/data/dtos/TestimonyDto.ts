import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
export class TestimonyDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'role - is required', example: 'customer' })
    role: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fullName - is required', example: 'John Mark' })
    fullName: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'description - is required' })
    description: string

}