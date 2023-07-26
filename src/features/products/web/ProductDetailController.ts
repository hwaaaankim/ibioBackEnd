import { Controller, Post, Put, Get, Delete, Param, Body, UsePipes, ValidationPipe, UseGuards, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { ProductDetail } from "../domain/ProductDetail";
import { ProductDetailDto } from "../data/dtos/ProductDetailDto";
import { ProductDetailService } from "../domain/ProductDetailService";
import { DatabaseFactory } from "src/database/DatabaseFactory";
import { JwtAuthGuard } from "src/util/auth/jwt/JwtAuthGuard";
import { Role } from "src/util/decorators/Role";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CompressionPipe } from "src/util/file_upload/CompressionPipe";


@Controller('products/details')
export class ProductDetailController {

    service: any

    constructor() {
        this.service = new ProductDetailService(DatabaseFactory.getRepository('product_details'))
    }

    @Post(':id')
    @UsePipes(ValidationPipe)
    @UseInterceptors(FilesInterceptor('images', 5))
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    addProductDetail(@Param('id') id: string, @Body() productDetailDto: ProductDetailDto, @UploadedFiles(CompressionPipe) images: any) {
        if(images) productDetailDto.images = images
        return this.service.addProductDetail(id, productDetailDto)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseInterceptors(FilesInterceptor('images', 5))
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    updateProductDetail(@Param('id') id: string, @Body() productDetailDto: ProductDetailDto, @UploadedFiles(CompressionPipe) images: any) {
        if(images) productDetailDto.images = images
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