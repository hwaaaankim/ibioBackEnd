import { FaqController } from './FaqController';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ FaqController],
    providers: [],
})
export class FaqModule {}
