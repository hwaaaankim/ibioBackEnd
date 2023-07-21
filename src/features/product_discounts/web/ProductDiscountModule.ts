import { Module } from '@nestjs/common';
import { ProductDiscountController } from './ProductDiscountController';

@Module({
  imports: [],
  controllers: [ProductDiscountController],
  providers: [],
})
export class ProductDiscountModule {}
