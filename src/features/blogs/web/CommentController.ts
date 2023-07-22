import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { BlogService } from '../domain/BlogService';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { Role } from 'src/util/decorators/Role';
import { CommentDto } from '../data/dtos/CommentDto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@ApiTags('blog/comments')
@Controller('blog/comments')
export class CommentController {

    service: any

    constructor() {
        this.service = new BlogService(DatabaseFactory.getRepository('blogs'))
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    
    @ApiCreatedResponse({description: 'Comment Added Succesfully'})
    @ApiUnprocessableEntityResponse({description: 'Bad Request'})
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    addComment(@Body() comment: CommentDto ): any {
        return this.service.addComment(comment)
    }


    @Get()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    
    @ApiOkResponse({ description: 'The resource was returned successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    getComments(): any {
        return this.service.getComments();
    }

    
}