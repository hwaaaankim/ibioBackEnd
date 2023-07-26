import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  Delete,
  ValidationPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { DatabaseFactory } from '../../../database/DatabaseFactory';
import { JwtAuthGuard } from '../../../util/auth/jwt/JwtAuthGuard';
import { AddProductReviewDto } from '../data/dtos/AddProductReviewDto';
import { UpdateProductReviewDto } from '../data/dtos/UpdateProductReviewDto';
import { ProductReviewService } from '../domain/ProductReviewService';
import { Role } from '../../../util/decorators/Role';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(AddProductReviewDto, UpdateProductReviewDto)
@Controller('product_reviews')
export class ProductReviewController {
  productReviewService: ProductReviewService;

  constructor() {
    this.productReviewService = new ProductReviewService();
    this.productReviewService.repository =
      DatabaseFactory.getRepository('Product_Review');
  }

  @Post()
  @UsePipes(ValidationPipe)
  addProductReview(@Body() newProductReview: AddProductReviewDto) {
    return this.productReviewService.addProductReview(newProductReview);
  }

  @Get(':id')
  getProductReview(@Param('id') productReviewId: string): any {
    return this.productReviewService.getProductReview(productReviewId);
  }

  @Get()
  getProductReviews(): any {
    return this.productReviewService.getProductReviews();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateProductReview(
    @Param('id') productReviewId: string,
    @Body() updatedProductReview: UpdateProductReviewDto,
  ): any {
    return this.productReviewService.updateProductReview(
      productReviewId,
      updatedProductReview,
    );
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteProductReview(@Param('id') productReviewId: string): any {
    return this.productReviewService.deleteProductReview(productReviewId);
  }
}
