import { ProductSpecification } from "../ProductSpecification";


export class ProductSpecificationService implements ProductSpecification {

    repository: ProductSpecification

    constructor(repository: ProductSpecification) {
        this.repository = repository
    }

    add(productDetailId: string, dto: any) {
        return this.repository.add(productDetailId, dto)
    }

    update(productDetailId: string, dto: any) {
        return this.repository.update(productDetailId, dto)
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