import { JwtAuthGuard } from './../../../util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MulterImageConfig } from './../../../util/file_upload/MulterConfig';
import { ProductDto } from './../data/dtos/ProductDto';
import { DatabaseFactory } from './../../../database/DatabaseFactory';
import { ProductService } from './../domain/ProductService';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/util/decorators/Role';
import { ProductDetailDto } from '../data/dtos/ProductDetailDto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(ProductDto)
@Controller('products')
export class ProductController {

    service: any

    constructor() {
        this.service = new ProductService(DatabaseFactory.getRepository('products'))
    }

    @Post()
    @UsePipes(ValidationPipe)
    // @UseInterceptors(FilesInterceptor('images', 2, MulterImageConfig))
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    addProduct(@Body() product: ProductDto): any {
       return this.service.addProduct(product)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    // @UseInterceptors(FilesInterceptor('images', 2, MulterImageConfig))
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    updateProduct(@Param('id') id: string, @Body() product: ProductDto): any {
        return this.service.updateProduct(id, product)
    }

    @Get('/categories/:id')
    filterProducts(@Param('id') category: string): any {
        return this.service.filterProducts(category);
    }

    @Get(':id')
    getProduct(@Param('id') id: string): any {
        return this.service.getProduct(id)
    }

    @Get()
    getProducts(@Query('page') page?: number,
        @Query('limit') limit?: number): any {
        return this.service.getProducts(page, limit)
    }

    @Get('search/:title')
    searchProducts(@Param('title') title: string, @Query('page') page?: number,
        @Query('limit') limit?: number): any {
        return this.service.searchProducts(title, page, limit)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    deleteProduct(@Param('id') id: string): any {
        return this.service.deleteProduct(id)
    }

    @Get('/price/:name')
    filterProductsByPrice(@Param('name') name: string): any {
        return this.service.filterProductsByPrice(name)
    }

    @Get(':id')
    getProductDetails(@Param('id') id: string): any {
        return this.service.getProductDetails(id);
    }


}