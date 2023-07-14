import { ProductRepository } from './../features/products/data/ProductRepository';
import { SystemErrorException } from './../util/exception/SystemErrorException';
import { UserRepository } from './../features/user/data/UserRepository';
import { MemberRepository } from './../features/members/data/MemberRepository';

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
      default:
        throw new SystemErrorException('repository not found');
    }
    return repository;
  }
}
