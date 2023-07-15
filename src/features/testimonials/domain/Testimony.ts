import { TestimonyDto } from "../data/dtos/TestimonyDto";


export interface Testimony {

    addTestimony(product: TestimonyDto): any
    updateTestimony(id: string, product: TestimonyDto): any
    getTestimonials(page?: number, limit?: number): any
    deleteTestimony(id: string): any

}