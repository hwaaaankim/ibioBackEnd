import { ProductDetailDto } from "../../data/dtos/ProductDetailDto";
import { ProductDetail } from "../ProductDetail";

export class ProductDetailService implements ProductDetail {

    repo: ProductDetail

    constructor(repo: ProductDetail) {
        this.repo = repo
    }

    addProductDetail(id: string, productDetailDto: ProductDetailDto) {
       return this.repo.addProductDetail(id, productDetailDto)
    }

    updateProductDetail(id: string, productDetailDto: ProductDetailDto) {
       return this.repo.addProductDetail(id, productDetailDto)
    }

    getProductDetail(id: string) {
       return this.repo.getProductDetail(id)
    }
    
    deleteProductDetail(id: string) {
       return this.repo.deleteProductDetail(id)
    }

}