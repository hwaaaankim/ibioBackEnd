import { CategoryDto } from "../data/dtos/CategoryDto"

export interface Category {

    addCategory(categoryDto: CategoryDto): any
    updateCategory(id: string, category: CategoryDto): any
    deleteCategory(id: string): any
    getCategories(): any
}
