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
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { AddProductReturnDto } from '../data/dtos/AddProductReturnDto';
import { UpdateProductReturnDto } from '../data/dtos/UpdateProductReturnDto';
import { ProductReturnService } from '../domain/ProductReturnService';
import { Role } from '../../../util/decorators/Role';

@Controller('product_returns')
export class ProductReturnController {
  productReturnService: ProductReturnService;

  constructor() {
    this.productReturnService = new ProductReturnService();
    this.productReturnService.repository =
      DatabaseFactory.getRepository('Product_Return');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addProductReturn(@Body() newProductReturn: AddProductReturnDto) {
    return this.productReturnService.addProductReturn(newProductReturn);
  }

  @Get(':id')
  getProductReturn(@Param('id') ProductReturnId: string): any {
    return this.productReturnService.getProductReturn(ProductReturnId);
  }

  @Get()
  getProductReturns(): any {
    return this.productReturnService.getProductReturns();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateProductReturn(
    @Param('id') ProductReturnId: string,
    @Body() updatedProductReturn: UpdateProductReturnDto,
  ): any {
    return this.productReturnService.updateProductReturn(
      ProductReturnId,
      updatedProductReturn,
    );
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteProductReturn(@Param('id') ProductReturnId: string): any {
    return this.productReturnService.deleteProductReturn(ProductReturnId);
  }
}
