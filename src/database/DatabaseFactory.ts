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
import { TaxRepository } from './../features/taxes/data/TaxRepository';
import { PaymentAddressRepository } from './../features/payments/payment_addresses/data/PaymentAddressRepository';
import { PaymentMethodRepository } from './../features/payments/payment_methods/data/PaymentMethodRepository';
import { ShippingAddressRepository } from './/../features/shipping/shipping_addresses/data/ShippingAddressRepository';
import { ProductSizeRepository } from 'src/features/products/data/ProductSizeRepository';
import { ProductColorRepository } from 'src/features/products/data/ProductColorRepository';
import { ProductSpecificationRepository } from 'src/features/products/data/ProductSpecificationRepository';
import { ProductVariantRepository } from 'src/features/products/data/ProductVariantRepository';
import { ProductMediaRepository } from 'src/features/products/data/ProductMediaRepository';

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
      case 'PRODUCT_COLOR':
        repository = new ProductColorRepository();
        break;
      case 'PRODUCT_SIZE':
        repository = new ProductSizeRepository();
        break;
      case 'PRODUCT_SPECIFICATION':
        repository = new ProductSpecificationRepository();
        break;
      case 'PRODUCT_VARIANT':
        repository = new ProductVariantRepository();
        break;
      case 'PRODUCT_MEDIA':
        repository = new ProductMediaRepository();
        break;
      case 'WISHLIST':
        repository = new WishlistRepository();
        break;
      case 'ORDER':
        repository = new OrderRepository();
        break;
      case 'TAX':
        repository = new TaxRepository();
        break;
      case 'PAYMENT_ADDRESS':
        repository = new PaymentAddressRepository();
        break;
      case 'PAYMENT_METHOD':
        repository = new PaymentMethodRepository();
        break;
      case 'SHIPPING_ADDRESS':
        repository = new ShippingAddressRepository();
        break;
      default:
        throw new SystemErrorException('Repository not found.');
    }
    return repository;
  }
}
