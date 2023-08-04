import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { Role } from 'src/util/decorators/Role';
import { CategoryDto } from '../data/dtos/CategoryDto';
import { ApiExtraModels } from '@nestjs/swagger';
import { ProductSpecificationService } from '../domain/services/ProductSpecificationService';
import { ProductSpecificationDto } from '../data/dtos/ProductSpecificationDto';


@ApiExtraModels(CategoryDto)
@Controller('products/specifications')
export class ProductSpecificationController {

    service: any

    constructor() {
        this.service = new ProductSpecificationService(DatabaseFactory.getRepository('product_specification'))
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    add(@Body() specs: any ): any {
        return this.service.add(specs)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    update(@Param('id') id: string, @Body() spec:ProductSpecificationDto ): any {
        return this.service.update(id, spec)
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