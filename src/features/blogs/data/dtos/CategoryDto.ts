import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CategoryDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type : String, description: 'name - (category name) is required'})
    name: string

}