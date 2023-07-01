import { ProductDto } from "../data/dtos/ProductDto";
import { Category } from "./Category";

export interface Product extends Category {

    addProduct(product: ProductDto): any
    updateProduct(id: string, product: ProductDto): any
    filterProducts(category: string, page?: number, limit?: number): any
    getProducts(page?: number, limit?: number): any
    getProductDetails(id: string): any
    searchProducts(title: string, page?: number, limit?: number): any
    deleteProduct(id: string): any
    filterProductsByPrice(name: string, page?: number, limit?: number): any

}