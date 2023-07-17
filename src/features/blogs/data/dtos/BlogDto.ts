import { IsNotEmpty, IsOptional, IsString} from "class-validator"

export class BlogDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    @IsString()
    categoryId: string

    @IsNotEmpty()
    @IsString()
    postedById: string

    @IsOptional()
    image: any

}