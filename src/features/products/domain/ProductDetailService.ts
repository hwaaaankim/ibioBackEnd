import { ProductDetailDto } from "../data/dtos/ProductDetailDto";
import { ProductDetail } from "./ProductDetail";

export class ProductDetailService implements ProductDetail {

    repo: ProductDetail

    constructor(repo: ProductDetail) {
        this.repo = repo
    }

    addProductDetail(id: string, productDetailDto: ProductDetailDto) {
       return this.addProductDetail(id, productDetailDto)
    }

    updateProductDetail(id: string, productDetailDto: ProductDetailDto) {
       return this.addProductDetail(id, productDetailDto)
    }

    getProductDetail(id: string) {
       return this.getProductDetail(id)
    }
    
    deleteProductDetail(id: string) {
       return this.deleteProductDetail(id)
    }

}