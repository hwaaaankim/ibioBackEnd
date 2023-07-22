import { IsNotEmpty, IsOptional, IsString} from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
export class BlogDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'title - is required' })
    title: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'content - is required' })
    content: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'categoryId - is required' })
    categoryId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'postedById - is required' })
    postedById: string

    @IsNotEmpty()
    // @IsOptional()
    @ApiProperty({type: String, description: 'image - is required' })
    image: any

}