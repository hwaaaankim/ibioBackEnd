import { Module } from '@nestjs/common';
import { ProductReviewController } from './ProductReviewController';

@Module({
  imports: [],
  controllers: [ProductReviewController],
  providers: [],
})
export class ProductReviewModule {}
