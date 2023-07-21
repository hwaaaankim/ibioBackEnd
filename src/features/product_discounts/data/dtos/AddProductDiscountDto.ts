import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class AddProductDiscountDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'productId', description: 'Product Id' })
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'DiscountPercent', description: 'Discount percent' })
  discountPercent: Number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'validUntil',
    description: 'Discount percent exists until',
  })
  validUntil: Date;
}
