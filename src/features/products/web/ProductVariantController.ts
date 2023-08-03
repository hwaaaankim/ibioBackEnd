import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { Role } from 'src/util/decorators/Role';
import { CategoryDto } from '../data/dtos/CategoryDto';
import { ApiExtraModels } from '@nestjs/swagger';
import { ProductVariantService } from '../domain/services/ProductVariantService';
import { ProductVariantDto } from '../data/dtos/ProductVariantDto';


@ApiExtraModels(CategoryDto)
@Controller('products/specifications')
export class ProductVariantController {

    service: any

    constructor() {
        this.service = new ProductVariantService(DatabaseFactory.getRepository('product_specification'))
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    add(@Body() variant: ProductVariantDto ): any {
        return this.service.add(variant)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    update(@Param('id') id: string, @Body() variant:ProductVariantDto ): any {
        return this.service.update(id, variant)
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    delete(@Param('id') id: string): any {
        return this.service.delete(id);
    }

    @Get()
    findAll(): any {
        return this.service.findAll();
    }

    @Get(':id')
    find(@Param('id') id: string): any {
        return this.service.find(id);
    }

    
}