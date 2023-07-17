import { FaqDto } from "../data/dtos/FaqDto";


export interface Faq {

    getFaqs(page?: number, limit?: number): any
    addFaq(product: FaqDto): any
    updateFaq(id: string, product: FaqDto): any
    deleteFaq(id: string): any

}