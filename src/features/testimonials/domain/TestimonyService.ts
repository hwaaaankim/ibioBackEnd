/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { TestimonyDto } from '../data/dtos/TestimonyDto';
import { Testimony } from './Testimony';

export class TestimonyService implements Testimony {

    repository: Testimony

    constructor(repository: Testimony) {
        this.repository = repository
    }
    
    addTestimony(testimony: TestimonyDto): Promise<any> {
        return this.repository.addTestimony(testimony)
    }
    updateTestimony(id: string, product: TestimonyDto): Promise<any> {
        return this.repository.updateTestimony(id, product)
    }
    
    getTestimonials(page?: number, limit?: number): Promise<any> {
        return this.repository.getTestimonials(page, limit)
    }
    
    deleteTestimony(id: string): Promise<any> {
        return this.repository.deleteTestimony(id)
    }



}