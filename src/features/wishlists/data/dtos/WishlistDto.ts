import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WishlistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'productDetailId', description: 'Product detail id' })
  productDetailId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'userId', description: 'User Id' })
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'quantity', description: 'Quantity' })
  quantity: number;

  options: WishlistDetailDto[];
}

export class WishlistDetailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'wishlistId', description: 'Wishlist Id' })
  wishlistId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'productOptionId',
    description: 'Product Attribute id either color or size Id',
  })
  productOptionId: string;
}
