
export interface ProductCrud {

    add(productId: string, dto: any): any
    update(productId: string, dto: any): any
    delete(id: string): any
    findAll(): any
    find(id: string): any

}