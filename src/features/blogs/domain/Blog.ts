import { CommentDto } from "../data/dtos/CommentDto";
import { BlogDto } from "../data/dtos/BlogDto.dto";
import { Category } from "./Category";

export interface Blog extends Category {

    addComment(commentDto: CommentDto): any
    getComments(id:string): any
    addBlog(Blog: BlogDto): any
    updateBlog(id: string, Blog: BlogDto): any
    filterBlogs(category: string, page?: number, limit?: number): any
    getBlogs(page?: number, limit?: number): any
    getBlogDetails(id: string): any
    deleteBlog(id: string): any

}