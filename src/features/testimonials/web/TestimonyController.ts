import { JwtAuthGuard } from '../../../util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MulterImageConfig } from '../../../util/file_upload/MulterConfig';
import { TestimonyDto } from '../data/dtos/TestimonyDto';
import { DatabaseFactory } from '../../../database/DatabaseFactory';
import { TestimonyService } from '../domain/TestimonyService';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
// import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/util/decorators/Role';
import { ApiCreatedResponse, ApiExtraModels, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@ApiTags('testimonials')
@ApiExtraModels(TestimonyDto)
@Controller('testimonials')
export class TestimonyController {

    service: any

    constructor() {
        this.service = new TestimonyService(DatabaseFactory.getRepository('testimonials'))
    }


    @Get()

    @ApiOkResponse({ description: 'Testimonials returned successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    getTestimonials(): any {
        return this.service.getTestimonials()
    }


    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])

    @ApiCreatedResponse({description: 'Testimony Created Succesfully'})
    @ApiUnprocessableEntityResponse({description: 'Bad Request'})
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    addTestimony(@Body() testimony: TestimonyDto ): any {
        
        return this.service.addTestimony(testimony)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])

    @ApiOkResponse({ description: 'Testimony updated successfully' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    updateTestimony(@Param('id') id: string, @Body() testimony: TestimonyDto): any {
    
        return this.service.updateTestimony(id, testimony)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])

    @ApiOkResponse({ description: 'Testimonials returned successfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    @ApiInternalServerErrorResponse({description: 'Server Not Found/ Internal Server Error'})

    deleteTestimony(@Param('id') id: string): any {
        return this.service.deleteTestimony(id)
    }

}