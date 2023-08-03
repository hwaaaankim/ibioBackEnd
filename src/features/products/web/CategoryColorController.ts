import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { Role } from 'src/util/decorators/Role';
import { CategoryDto } from '../data/dtos/CategoryDto';
import { ApiExtraModels } from '@nestjs/swagger';
import { ProductColorService } from '../domain/services/ProductColorService';


@ApiExtraModels(CategoryDto)
@Controller('products/colors')
export class ProductColorController {

    service: any

    constructor() {
        this.service = new ProductColorService(DatabaseFactory.getRepository('product_color'))
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    add(@Body() color: any ): any {
        return this.service.add(color.color)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    update(@Param('id') id: string, @Body() color:any ): any {
        return this.service.update(id, color.color)
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    delete(@Param('id') id: string): any {
        console.log(id);
        return this.service.deleteCategory(id);
    }

    @Get()
    getAll(): any {
        return this.service.getCategories();
    }

    @Get()
    get(): any {
        return this.service.getCategories();
    }

    
}