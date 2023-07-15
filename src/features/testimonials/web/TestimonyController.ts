import { JwtAuthGuard } from '../../../util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MulterImageConfig } from '../../../util/file_upload/MulterConfig';
import { TestimonyDto } from '../data/dtos/TestimonyDto';
import { DatabaseFactory } from '../../../database/DatabaseFactory';
import { TestimonyService } from '../domain/TestimonyService';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
// import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/util/decorators/Role';

@Controller('testimonials')
export class TestimonyController {

    service: any

    constructor() {
        this.service = new TestimonyService(DatabaseFactory.getRepository('testimonials'))
    }


    @Get()
    getTestimonials(): any {
        return this.service.getTestimonials()
    }


    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    addTestimony(@Body() testimony: TestimonyDto ): any {
        
        return this.service.addTestimony(testimony)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    updateTestimony(@Param('id') id: string, @Body() testimony: TestimonyDto): any {
    
        return this.service.updateTestimony(id, testimony)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    deleteTestimony(@Param('id') id: string): any {
        return this.service.deleteTestimony(id)
    }

}