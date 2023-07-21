import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductReturnDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'productId', description: 'Product Id' })
  productId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'fullName', description: 'Fullname' })
  fullName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'Review', description: 'Review' })
  review: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: 'Rating', description: 'Rate value' })
  rating: number;
}
