import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { BlogService } from '../domain/BlogService';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { Role } from 'src/util/decorators/Role';
import { CommentDto } from '../data/dtos/CommentDto';


@Controller('blog/comments')
export class CommentController {

    service: any

    constructor() {
        this.service = new BlogService(DatabaseFactory.getRepository('blogs'))
    }

    @Post()
    // @UsePipes(ValidationPipe)
    // @UseGuards(JwtAuthGuard)
    
    addComment(@Body() comment: CommentDto ): any {
        return this.service.addComment(comment)
    }


    @Get()
    // @UsePipes(ValidationPipe)
    // @UseGuards(JwtAuthGuard)
    
    getComments(): any {
        return this.service.getComments();
    }

    
}