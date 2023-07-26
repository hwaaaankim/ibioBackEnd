import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString} from "class-validator"

export class FaqDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'question - is required' })
    question: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'answer - is required' })
    answer: string
}