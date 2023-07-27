import { ProductRepository } from './../features/products/data/ProductRepository';
import { FaqRepository } from './../features/freqAskedQuens/data/FaqRepository';
import { BlogRepository } from './../features/blogs/data/BlogRepository';
import { TestimonyRepository } from './../features/testimonials/data/TestimonyRepository';
import { SystemErrorException } from './../util/exception/SystemErrorException';
import { UserRepository } from './../features/user/data/UserRepository';
import { MemberRepository } from './../features/members/data/MemberRepository';
import { StateRepository } from './../features/states/data/StateRepository';
import { CurrencyRepository } from './../features/curriencies/data/CurrencyRepository';
import { TagRepository } from './../features/tags/data/TagRepository';
import { ProductReviewRepository } from './../features/product_reviews/data/ProductReviewRepository';
import { ProductReturnRepository } from './../features/product_returns/data/ProductReturnRepository';
import { ProductTagRepository } from './../features/product_tags/data/ProductTagRepository';
import { WishlistRepository } from './../features/wishlists/data/WishlistRepository';
import { ProductDetailRepository } from './../features/products/data/ProductDetailRepository';
import { OrderRepository } from './../features/orders/data/OrderRepository';

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
      case 'TAG':
        repository = new TagRepository();
        break;
      case 'PRODUCT_TAG':
        repository = new ProductTagRepository();
        break;
      case 'PRODUCT_REVIEW':
        repository = new ProductReviewRepository();
        break;
      case 'PRODUCT_RETURN':
        repository = new ProductReturnRepository();
        break;
      case 'PRODUCT_DISCOUNT':
        repository = new ProductReviewRepository();
        break;
      case 'PRODUCT_DETAILS':
        repository = new ProductDetailRepository();
        break;
      case 'WISHLIST':
        repository = new WishlistRepository();
        break;
      case 'ORDER':
        repository = new OrderRepository();
        break;
      default:
        throw new SystemErrorException('Repository not found.');
    }
    return repository;
  }
}
