import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDiscountDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'productId', description: 'Product Id' })
  productId: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: 'DiscountPercent', description: 'Discount percent' })
  discountPercent: Number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'validUntil',
    description: 'Discount percent exists until',
  })
  validUntil: Date;
}
