import { ProductDetailDto } from "../data/dtos/ProductDetailDto"

export interface ProductDetail {

    addProductDetail(id: string, productDetailDto: ProductDetailDto): any
    updateProductDetail(id: string, productDetailDto: ProductDetailDto): any
    getProductDetail(id: string): any
    deleteProductDetail(id: string): any

}