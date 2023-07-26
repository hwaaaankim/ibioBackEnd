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
import { AddProductDiscountDto } from '../data/dtos/AddProductDiscountDto';
import { UpdateProductDiscountDto } from '../data/dtos/UpdateProductDiscountDto';
import { ProductDiscountService } from '../domain/ProductDiscountService';
import { Role } from '../../../util/decorators/Role';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(AddProductDiscountDto, UpdateProductDiscountDto)
@Controller('product_discounts')
export class ProductDiscountController {
  productDiscountService: ProductDiscountService;

  constructor() {
    this.productDiscountService = new ProductDiscountService();
    this.productDiscountService.repository =
      DatabaseFactory.getRepository('Product_Discount');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addProductDiscount(@Body() newProductDiscount: AddProductDiscountDto) {
    return this.productDiscountService.addProductDiscount(newProductDiscount);
  }

  @Get(':id')
  getProductDiscount(@Param('id') ProductDiscountId: string): any {
    return this.productDiscountService.getProductDiscount(ProductDiscountId);
  }

  @Get()
  getProductDiscounts(): any {
    return this.productDiscountService.getProductDiscounts();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateProductDiscount(
    @Param('id') ProductDiscountId: string,
    @Body() updatedProductDiscount: UpdateProductDiscountDto,
  ): any {
    return this.productDiscountService.updateProductDiscount(
      ProductDiscountId,
      updatedProductDiscount,
    );
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteProductDiscount(@Param('id') ProductDiscountId: string): any {
    return this.productDiscountService.deleteProductDiscount(ProductDiscountId);
  }
}
