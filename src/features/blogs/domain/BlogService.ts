/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CategoryDto } from '../data/dtos/CategoryDto';
import { BlogDto } from '../data/dtos/BlogDto';
import { Blog } from './Blog';
import { CommentDto } from '../data/dtos/CommentDto';

export class BlogService implements Blog {

    repository: Blog

    constructor(repository: Blog) {
        this.repository = repository
    }

    addComment(commentDto: CommentDto) {
        return this.repository.addComment(commentDto)
    }
    getComments(id: string) {
        return this.repository.getComments(id)
    }
    addCategory(category: CategoryDto) {
        return this.repository.addCategory(category)
    }
    updateCategory(id: string, category: CategoryDto) {
        return this.repository.updateCategory(id, category)
    }
    deleteCategory(id: string) {
        return this.repository.deleteCategory(id)
    }
    getCategories() {
        return this.repository.getCategories()
    }

    getBlogDetails(id: string) {
        return this.repository.getBlogDetails(id);
    }
    addBlog(blog: BlogDto): Promise<any> {
        return this.repository.addBlog(blog)
    }
    updateBlog(id: string, blog: BlogDto): Promise<any> {
        return this.repository.updateBlog(id, blog)
    }
    filterBlogs(category: string, page?: number, limit?: number): Promise<any> {
        return this.repository.filterBlogs(category, page, limit)
    }
    getBlogs(page?: number, limit?: number): Promise<any> {
        return this.repository.getBlogs(page, limit)
    }
    deleteBlog(id: string): Promise<any> {
        return this.repository.deleteBlog(id)
    }

}