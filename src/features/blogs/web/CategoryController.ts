import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { BlogService } from '../domain/BlogService';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { Role } from 'src/util/decorators/Role';
import { CategoryDto } from '../data/dtos/CategoryDto';


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
    addCategory(@Body() category: CategoryDto ): any {
        return this.service.addCategory(category)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    updateCategory(@Param('id') id: string, @Body() category:CategoryDto ): any {
        return this.service.updateCategory(id, category)
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    deleteCategory(@Param('id') id: string): any {
        console.log(id);
        return this.service.deleteCategory(id);
    }

    @Get()
    getCategories(): any {

        return this.service.getCategories();
    }

    
}