import { ProductSize } from "../ProductSize";


export class ProductSizeService implements ProductSize {

    repository: ProductSize

    constructor(repository: ProductSize) {
        this.repository = repository
    }

    add(productId: string, dto: any) {
        return this.repository.add(productId, dto)
    }

    update(productId: string, dto: any) {
        return this.repository.update(productId, dto)
    }

    delete(id: string) {
        return this.repository.delete(id)
    }

    findAll() {
        return this.repository.findAll()
    }
    
    find(id: string) {
        return this.repository.find(id)
    }

}