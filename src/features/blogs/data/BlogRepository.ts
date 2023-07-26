import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { BlogEntity } from './models/BlogEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Blog } from '../domain/Blog';
import { BlogDto } from './dtos/BlogDto.dto';
import { Like, getRepository } from 'typeorm';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { CategoryDto } from './dtos/CategoryDto';
import { CategoryEntity } from './models/CategoryEntity';
import { BlogImageEntity } from './models/BlogImageEntity';
import * as fs from 'fs';
import { join } from 'path';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';
import { CommentDto } from './dtos/CommentDto';
import { CommentEntity } from './models/CommentEntity';

export class BlogRepository implements Blog {
  entity: EntityClassOrSchema = BlogEntity;
  private BlogRepository = AppDataSource.getRepository(this.entity);

  async addBlog(blog: BlogDto): Promise<boolean> {
    try {
      const created = await this.BlogRepository.create(blog).save();

      if (blog.image) {
          await AppDataSource.getRepository(BlogImageEntity)
            .create({
              blogId: created.id,
              image: blog.image,
            })
            .save();
       
      }
      return this.BlogRepository.findOne({
        where: { id: created.id },
        relations: ['image'],
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Blog already exists');
      }
      throw new SystemErrorException();
    }
  }

  async getBlogs(page?: number, limit?: number): Promise<any> {
    const currentPage = page * 1 || 10;
    const take = limit * 1;
    const skip = (currentPage - 1) * limit || 0;
    const allBlogs = await this.BlogRepository.count();
    const blogs = await this.BlogRepository.find({
      // skip: skip,
      // take: take,
      relations: ['image', 'category', 'comments'],
    });
    return { allBlogs, blogs };
  }

  async updateBlog(id: string, blogDto: BlogDto): Promise<any> {
    const blog: BlogEntity = await this.BlogRepository.findOne({
      where: { id: id },
      relations : ['image', 'category']
    });
    if (!blog) throw new DataNotFoundException('blog not found');
   
    try {
      blog.title = blogDto.title;
      blog.content = blogDto.content;
      blog.postedById = blogDto.postedById;
      blog.category.id = blogDto.categoryId
      
      // add images
      if (blogDto.image) {
        
          await AppDataSource.getRepository(BlogImageEntity)
            .create({
              blogId: blog.id,
              image: blogDto.image,
            })
            .save();
        
      }
      const updated = await blog.save();
      return this.BlogRepository.findOne({
        where: { id: updated.id },
        relations: ['comments', 'image', 'category'],
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Blog already exists');
      }
      throw new SystemErrorException();
    }
  }

  async deleteBlog(id: string): Promise<boolean> {
    // get the blog first
    const blog: BlogEntity = await this.BlogRepository.findOne({
      where: {
        id: id,
      },
      relations: ['image'],
    });
    try {
      try {
        await  getRepository(BlogImageEntity).delete({ blogId: id });
      
          fs.unlink(
            join(process.cwd() + '/uploads/images/' + blog.image),
            (err) => {
              if (err) {
                console.error(err);
                //  return err;
              }
            },
          );
      
      } catch (e) {
        console.log('no colors or images found I guess');
      }
      blog.remove();
      return true;
    } catch (error) {
      throw new SystemErrorException();
    }
  }

  async getBlogDetails(id: string): Promise<any> {
    const blog = await this.BlogRepository.findOne({
      where: { id: id },
      relations: ['colors', 'images'],
    });
    return blog;
  }
  async addComment(commentDto: CommentDto ): Promise<any>{
    const comment = {
      fullName: commentDto.fullName,
      code: commentDto.code,
      blogId: commentDto.blogId,
      comment: commentDto.comment
    };
    try{
      await AppDataSource.getRepository(CommentEntity).create(comment).save();
      return true;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('comment already exists');
      }
      throw new SystemErrorException();
    }
  }

  async getComments(blog_id: string, page?: number, limit?: number): Promise<any>{
    
    const currentPage = page * 1 || 10;
    const take = limit * 1;
    const skip = (currentPage - 1) * limit || 0;
    const allBlogs = await AppDataSource.getRepository(CommentEntity).count();
    const blogs = await AppDataSource.getRepository(CommentEntity).find({
      // skip: skip,
      // take: take,
    });
    return { allBlogs, blogs };
  
  }

  async addCategory(categoryDto: CategoryDto): Promise<any> {
    const category = {
      name: categoryDto.name,
    };
    try {
      await AppDataSource.getRepository(CategoryEntity).create(category).save();
      return true;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Category already exists');
      }
      throw new SystemErrorException();
    }
  }
  async updateCategory(id: string, categoryDto: CategoryDto): Promise<boolean> {
    const category: CategoryEntity = await AppDataSource.getRepository(
      CategoryEntity,
    ).findOne({
      where: { id: id },
    });

    if (!category) throw new DataNotFoundException('');
    try {
      category.name = categoryDto.name;
      category.save();
      return true;
    } catch (e) {}
  }
  async deleteCategory(id: string): Promise<any> {
    console.log('hey man');
    const category: CategoryEntity = await AppDataSource.getRepository(
      CategoryEntity,
    ).findOne({
      where: { id: id },
    });
    try {
      console.log(category);
      category.softRemove();
    } catch (e) {
      console.log(e);
      throw new SystemErrorException();
    }
  }
  async getCategories(): Promise<any> {
    return await AppDataSource.getRepository(CategoryEntity).find();
  }


  async filterBlogs(
    category: string,
    page?: number,
    limit?: number,
  ): Promise<any> {
    
    category = category.toLowerCase();
    
    const currentPage = page * 1 || 10;
    const take = limit * 1;
    const skip = (currentPage - 1) * limit || 0;
    const allBlogs = await this.BlogRepository
          .createQueryBuilder('blog')
          .where('blog.categoryId = :id',{id:category})
          .getCount()
    const blogs = await this.BlogRepository
          .createQueryBuilder('blog')
          .where('blog.categoryId = :id',{id:category})
          .getMany()
    return { allBlogs: allBlogs, blogs };
  }

}
