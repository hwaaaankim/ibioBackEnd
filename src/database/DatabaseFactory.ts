import { ProductRepository } from './../features/products/data/ProductRepository';
import { FaqRepository } from './../features/freqAskedQuens/data/FaqRepository';
import { BlogRepository } from './../features/blogs/data/BlogRepository';
import { TestimonyRepository } from './../features/testimonials/data/TestimonyRepository';
import { SystemErrorException } from './../util/exception/SystemErrorException';
import { UserRepository } from './../features/user/data/UserRepository';
import { MemberRepository } from './../features/members/data/MemberRepository';
import { StateRepository } from './../features/states/data/StateRepository';
import { CurrencyRepository } from './../features/curriencies/data/CurrencyRepository';

export class DatabaseFactory {
  static getRepository(feature: string): any {
    feature = feature.toUpperCase();
    let repository: any;
    switch (feature) {
      case 'USER':
        repository = new UserRepository();
        break;
      case 'PRODUCTS':
        repository = new ProductRepository();
        break;
      case 'MEMBER':
        repository = new MemberRepository();
        break;

      case 'FAQS':
        repository = new FaqRepository();
        break;
      case 'BLOGS':
        repository = new BlogRepository();
        break;
      case 'TESTIMONIALS':
        repository = new TestimonyRepository();
        break;
      case 'STATE':
        repository = new StateRepository();
        break;
      case 'CURRENCY':
        repository = new CurrencyRepository();
        break;
      default:
        throw new SystemErrorException('repository not found');
    }
    return repository;
  }
}
