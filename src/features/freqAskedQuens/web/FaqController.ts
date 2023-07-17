import { JwtAuthGuard } from '../../../util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MulterImageConfig } from '../../../util/file_upload/MulterConfig';
import { FaqDto } from '../data/dtos/FaqDto';
import { DatabaseFactory } from '../../../database/DatabaseFactory';
import { FaqService } from '../domain/FaqService';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
// import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/util/decorators/Role';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors';

@Controller('faqs')
export class FaqController {

    service: any

    constructor() {
        this.service = new FaqService(DatabaseFactory.getRepository('faqs'))
    }

    @Get()
    getFaqs(): any {
        return this.service.getFaqs()
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    addFaq(@Body() faq: FaqDto): any {
        return this.service.addFaq(faq)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    updateFaq(@Param('id') id: string, @Body() faq: FaqDto): any {
        console.log("controller")
        return this.service.updateFaq(id, faq)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    deleteFaq(@Param('id') id: string): any {
        return this.service.deleteFaq(id)
    }

}