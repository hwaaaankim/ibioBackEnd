/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CategoryDto } from '../../data/dtos/CategoryDto';
import { ProductDto } from '../../data/dtos/ProductDto';
import { Product } from '../Product';

export class ProductService implements Product {

    repository: Product

    constructor(repository: Product) {
        this.repository = repository
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

    getProduct(id: string) {
        return this.repository.getProduct(id);
    }

    filterProductsByPrice(name: string, page?: number, limit?: number): Promise<any> {
        return this.repository.filterProductsByPrice(name, page, limit)
    }
    addProduct(product: ProductDto): Promise<any> {
        return this.repository.addProduct(product)
    }
    updateProduct(id: string, product: ProductDto): Promise<any> {
        return this.repository.updateProduct(id, product)
    }
    filterProducts(category: string, page?: number, limit?: number): Promise<any> {
        return this.repository.filterProducts(category, page, limit)
    }
    getProducts(page?: number, limit?: number): Promise<any> {
        return this.repository.getProducts(page, limit)
    }
    searchProducts(name: string, page?: number, limit?: number): Promise<any> {
        return this.repository.searchProducts(name, page, limit)
    }
    deleteProduct(id: string): Promise<any> {
        return this.repository.deleteProduct(id)
    }



}