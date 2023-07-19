import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductTagDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'productId', description: 'Product Id' })
  productId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'tagId', description: 'Tag Id' })
  tagId: string;
}
