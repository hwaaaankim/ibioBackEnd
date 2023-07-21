import { Module } from '@nestjs/common';
import { ProductTagController } from './ProductTagController';

@Module({
  imports: [],
  controllers: [ProductTagController],
  providers: [],
})
export class ProductTagModule {}
