import { CategoryController } from './CategoryController';
import { ProductController } from './ProductController';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ProductDetailController } from './ProductDetailController';
import { ProductColorController } from './ProductColorController';
import { ProductSizeController } from './ProductSizeController';
import { ProductMediaController } from './ProductMediaController';
import { ProductSpecificationController } from './ProductSpecificationController';
import { ProductVariantController } from './ProductVariantController';

@Module({
    imports: [],
    controllers: [
        ProductController,
        CategoryController,
        ProductDetailController,
        ProductColorController,
        ProductSizeController,
        ProductMediaController,
        ProductSpecificationController,
        ProductVariantController
    ],
    providers: [],
})
export class ProductModule { }
