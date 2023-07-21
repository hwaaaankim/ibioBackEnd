import { CategoryController } from './CategoryController';
import { ProductController } from './ProductController';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ProductDetailController } from './ProductDetailController';

@Module({
    imports: [],
    controllers: [ ProductController, CategoryController, ProductDetailController ],
    providers: [],
})
export class ProductModule {}
