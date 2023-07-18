import { JwtAuthGuard } from '../../../util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MulterImageConfig } from '../../../util/file_upload/MulterConfig';
import { BlogDto } from '../data/dtos/BlogDto';
import { DatabaseFactory } from '../../../database/DatabaseFactory';
import { BlogService } from '../domain/BlogService';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
// import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/util/decorators/Role';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors';

@Controller('blogs')
export class BlogController {

    service: any

    constructor() {
        this.service = new BlogService(DatabaseFactory.getRepository('blogs'))
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(FilesInterceptor('image', 1, MulterImageConfig))
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    addBlog(@Body() blog: BlogDto, @UploadedFile() image: any): any {
        if (image) {
                blog.image = image.filename;
        }

        return this.service.addBlog(blog)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseInterceptors(FilesInterceptor('image', 1, MulterImageConfig))
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    updateBlog(@Param('id') id: string, @Body() blog: BlogDto, @UploadedFile() image: any): any {
        if (image) {
                blog.image = image.filename;
        }
        
        return this.service.updateBlog(id, blog)
        
    }

    @Get('/categories/:id')
    filterBlogs(@Param('id') category: string): any {
        return this.service.filterBlogs(category);
    }

    @Get()
    getBlogs(@Query('page') page?: number,
        @Query('limit') limit?: number): any {
        return this.service.getBlogs(page, limit)
    }

    @Get('search/:title')
    searchBlogs(@Param('title') title: string, @Query('page') page?: number,
        @Query('limit') limit?: number): any {
        return this.service.searchBlogs(title, page, limit)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    deleteBlog(@Param('id') id: string): any {
        return this.service.deleteBlog(id)
    }

    @Get(':id')
    getBlogDetails(@Param('id') id: string): any {
        return this.service.getBlogDetails(id);
    }


}