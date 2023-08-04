import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { Role } from 'src/util/decorators/Role';
import { CategoryDto } from '../data/dtos/CategoryDto';
import { ApiExtraModels } from '@nestjs/swagger';
import { ProductMediaService } from '../domain/services/ProductMediaService';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CompressionPipe, CompressionPipeMultiple } from 'src/util/file_upload/CompressionPipe';
import { ValidationException } from 'src/util/exception/ValidationException';


@ApiExtraModels(CategoryDto)
@Controller('products/media')
export class ProductMediaController {

    service: any

    constructor() {
        this.service = new ProductMediaService(DatabaseFactory.getRepository('product_media'))
    }

    @Post(':id')
    @UsePipes(ValidationPipe)
    @UseInterceptors(FilesInterceptor('images', 5))
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    add(@Param('id') productId: string, @UploadedFiles(CompressionPipeMultiple) images: any): any {
        if (!images) throw new ValidationException('no images found')
        return this.service.add(productId, images)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseInterceptors(FilesInterceptor('images', 1))
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    update(@Param('id') id: string, @UploadedFile(CompressionPipe) image: any): any {
        if (!image) throw new ValidationException('no image found')
        return this.service.update(id, image)
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