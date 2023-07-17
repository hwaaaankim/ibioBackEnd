import { TestimonyController } from './TestimonyController';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ TestimonyController ],
    providers: [],
})
export class TestimonyModule {}
