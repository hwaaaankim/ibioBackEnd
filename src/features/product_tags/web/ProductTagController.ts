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
import { AddProductTagDto } from '../data/dtos/AddProductTagDto';
import { UpdateProductTagDto } from '../data/dtos/UpdateProductTagDto';
import { ProductTagService } from '../domain/ProductTagService';
import { Role } from '../../../util/decorators/Role';

@Controller('product_tags')
export class ProductTagController {
  productTagService: ProductTagService;

  constructor() {
    this.productTagService = new ProductTagService();
    this.productTagService.repository =
      DatabaseFactory.getRepository('Product_Tag');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addProductTag(@Body() newProductTag: AddProductTagDto) {
    return this.productTagService.addProductTag(newProductTag);
  }

  @Get(':id')
  getProductTag(@Param('id') productTagId: string): any {
    return this.productTagService.getProductTag(productTagId);
  }

  @Get()
  getProductTags(): any {
    return this.productTagService.getProductTags();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateProductTag(
    @Param('id') productTagId: string,
    @Body() updatedProductTag: UpdateProductTagDto,
  ): any {
    return this.productTagService.updateProductTag(
      productTagId,
      updatedProductTag,
    );
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteProductTag(@Param('id') productTagId: string): any {
    return this.productTagService.deleteProductTag(productTagId);
  }
}
