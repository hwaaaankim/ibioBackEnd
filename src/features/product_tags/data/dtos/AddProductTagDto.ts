import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddProductTagDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'productId', description: 'Product Id' })
  productId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'tagId', description: 'Tag Id' })
  tagId: string;
}
