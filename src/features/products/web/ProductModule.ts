import { CategoryController } from './CategoryController';
import { ProductController } from './ProductController';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ ProductController, CategoryController ],
    providers: [],
})
export class ProductModule {}
