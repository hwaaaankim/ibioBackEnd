/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FaqDto } from '../data/dtos/FaqDto';
import { Faq } from './Faq';

export class FaqService implements Faq {

    repository: Faq

    constructor(repository: Faq) {
        this.repository = repository
    }

    addFaq(faq: FaqDto): Promise<any> {
        
        return this.repository.addFaq(faq)
    }
    updateFaq(id: string, faq: FaqDto): Promise<any> {
        return this.repository.updateFaq(id, faq)
    }

    getFaqs(page?: number, limit?: number): Promise<any> {
        return this.repository.getFaqs(page, limit)
    }
    deleteFaq(id: string): Promise<any> {
        return this.repository.deleteFaq(id)
    }

}