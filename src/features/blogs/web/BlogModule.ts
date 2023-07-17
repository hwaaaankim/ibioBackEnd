import { CategoryController } from './CategoryController';
import { BlogController } from './BlogController';
import { CommentController } from './CommentController';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ BlogController, CategoryController, CommentController ],
    providers: [],
})
export class BlogModule {}
