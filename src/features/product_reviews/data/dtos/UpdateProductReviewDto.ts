import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductReviewDto {
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
