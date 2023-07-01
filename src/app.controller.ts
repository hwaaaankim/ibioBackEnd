import { JwtAuthGuard } from './util/auth/jwt/JwtAuthGuard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Controller, Get, Param, Response, UseGuards } from '@nestjs/common';
import { join } from 'path';
import { Role } from './util/decorators/Role';


@Controller()
export class AppController {

    @Get('/images/:image')
    getImage(@Param('image') image: string, @Response() res) {
        return res.sendFile(join(process.cwd() + '/uploads/images/' + image)) 
    }

    @Get('/files/:file')
    @UseGuards(JwtAuthGuard)
    @Role(['admin'])
    getFiles(@Param('file') image: string, @Response() res) {
        return res.sendFile(join(process.cwd() + '/uploads/files/' + image)) 
    }
    
}
