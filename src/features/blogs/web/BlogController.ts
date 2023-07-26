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
import { ApiTags, ApiOkResponse,ApiNotFoundResponse, ApiForbiddenResponse, ApiUnprocessableEntityResponse, ApiCreatedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('blogs')
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

    @ApiCreatedResponse({description: 'Blog Created Succesfully'})
    @ApiUnprocessableEntityResponse({description: 'Bad Request'})
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})
    
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

    @ApiOkResponse({ description: 'Blog updated successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    updateBlog(@Param('id') id: string, @Body() blog: BlogDto, @UploadedFile() image: any): any {
        if (image) {
                blog.image = image.filename;
        }
        
        return this.service.updateBlog(id, blog)
        
    }

    @Get('/categories/:id')

    @ApiOkResponse({ description: 'Resource returned successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    filterBlogs(@Param('id') category: string): any {
        return this.service.filterBlogs(category);
    }

    @Get()

    @ApiOkResponse({ description: 'The resource was returned successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    getBlogs(@Query('page') page?: number,
        @Query('limit') limit?: number): any {
        return this.service.getBlogs(page, limit)
    }

    @Get('search/:title')

    @ApiOkResponse({ description: 'The resource was returned successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    searchBlogs(@Param('title') title: string, @Query('page') page?: number,
        @Query('limit') limit?: number): any {
        return this.service.searchBlogs(title, page, limit)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])

    @ApiOkResponse({ description: 'Blog deleted successfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    deleteBlog(@Param('id') id: string): any {
        return this.service.deleteBlog(id)
    }

    @Get(':id')

    @ApiOkResponse({ description: 'The resource was returned successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    getBlogDetails(@Param('id') id: string): any {
        return this.service.getBlogDetails(id);
    }

}
