import { Controller, Post, Put, Get, Delete, Param, Body, UsePipes, ValidationPipe, UseGuards } from "@nestjs/common";
import { ProductDetailDto } from "../data/dtos/ProductDetailDto";
import { ProductDetailService } from "../domain/services/ProductDetailService";
import { DatabaseFactory } from "src/database/DatabaseFactory";
import { JwtAuthGuard } from "src/util/auth/jwt/JwtAuthGuard";
import { Role } from "src/util/decorators/Role";
import { ApiExtraModels } from "@nestjs/swagger";

@ApiExtraModels(ProductDetailDto)
@Controller('products/details')
export class ProductDetailController {

    service: any

    constructor() {
        this.service = new ProductDetailService(DatabaseFactory.getRepository('product_details'))
    }

    @Post(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    addProductDetail(@Param('id') id: string, @Body() productDetailDto: ProductDetailDto) {
        return this.service.addProductDetail(id, productDetailDto)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    updateProductDetail(@Param('id') id: string, @Body() productDetailDto: ProductDetailDto) {
        return this.service.addProductDetail(id, productDetailDto)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    getProductDetail(@Param('id') id: string) {
        return this.service.getProductDetail(id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    deleteProductDetail(@Param('id') id: string) {
        return this.service.deleteProductDetail(id)
    }



}