import { Module } from '@nestjs/common';
import { ProductReturnController } from './ProductReturnController';

@Module({
  imports: [],
  controllers: [ProductReturnController],
  providers: [],
})
export class ProductReturnModule {}
