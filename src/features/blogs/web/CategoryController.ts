import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { BlogService } from '../domain/BlogService';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { Role } from 'src/util/decorators/Role';
import { CategoryDto } from '../data/dtos/CategoryDto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@ApiTags('blog/category')
@Controller('blog/category')
export class CategoryController {

    service: any

    constructor() {
        this.service = new BlogService(DatabaseFactory.getRepository('blogs'))
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])

    @ApiCreatedResponse({description: 'Category Created Succesfully'})
    @ApiUnprocessableEntityResponse({description: 'Bad Request'})
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    addCategory(@Body() category: CategoryDto ): any {
        return this.service.addCategory(category)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    
    @ApiOkResponse({ description: 'Blog updated successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    updateCategory(@Param('id') id: string, @Body() category:CategoryDto ): any {
        return this.service.updateCategory(id, category)
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])

    @ApiOkResponse({ description: 'Category deleted successfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    deleteCategory(@Param('id') id: string): any {
        console.log(id);
        return this.service.deleteCategory(id);
    }

    @Get()

    @ApiOkResponse({ description: 'The resource was returned successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})
    
    getCategories(): any {

        return this.service.getCategories();
    }

    
}