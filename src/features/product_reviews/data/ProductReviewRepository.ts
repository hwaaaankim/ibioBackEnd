import { ProductReviewEntity } from './models/ProductReviewEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ProductReview } from '../domain/ProductReview';
import { AddProductReviewDto } from './dtos/AddProductReviewDto';
import { UpdateProductReviewDto } from './dtos/UpdateProductReviewDto';
import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';

export class ProductReviewRepository implements ProductReview {
  entity: EntityClassOrSchema = ProductReviewEntity;
  productReviewRepository = AppDataSource.getRepository(this.entity);

  async addProductReview(
    newProductReview: AddProductReviewDto,
  ): Promise<boolean> {
    try {
      await this.productReviewRepository.create(newProductReview).save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('ProductReview already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getProductReview(productReviewId: string): Promise<any> {
    const productReview = await this.productReviewRepository.findOne({
      where: { id: productReviewId },
    });
    if (!productReview) {
      throw new DataNotFoundException('ProductReview not dound');
    }
    return productReview;
  }

  async getProductReviews(): Promise<any> {
    const productReviews = await this.productReviewRepository.find();
    if (!productReviews)
      throw new DataNotFoundException(
        'No ProductReviews have been created yet',
      );
    return productReviews;
  }

  async getProductRate(productId: string): Promise<any> {
    const productRate = await this.productReviewRepository
      .createQueryBuilder('productReview')
      .select(['SUM(productReview.rating)', 'productReview.productId'])
      .where('productReview.productId=:', { productId: productId })
      .groupBy('productReview.productId')
      .getOne();

    if (!productRate) {
      throw new DataNotFoundException('Product rate not dound');
    }
    return productRate;
  }

  async getProductRates(): Promise<any> {
    const productRates = await this.productReviewRepository
      .createQueryBuilder('productReview')
      .select(['SUM(productReview.rating)', 'productReview.productId'])
      .groupBy('productReview.productId')
      .getMany();

    if (!productRates)
      throw new DataNotFoundException(
        'No ProductReviews have been created yet',
      );
    return productRates;
  }

  async updateProductReview(
    ProductReviewId: string,
    updatedProductReview: UpdateProductReviewDto,
  ): Promise<boolean> {
    const productReview: ProductReviewEntity = await this.getProductReview(
      ProductReviewId,
    );

    if (updatedProductReview.fullName)
      productReview.fullName = updatedProductReview.fullName;
    if (updatedProductReview.productId)
      productReview.productId = updatedProductReview.productId;
    if (updatedProductReview.review)
      productReview.review = updatedProductReview.review;
    if (updatedProductReview.rating)
      productReview.rating = updatedProductReview.rating;
    try {
      await productReview.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deleteProductReview(ProductReviewId: string): Promise<boolean> {
    const productReview: ProductReviewEntity = await this.getProductReview(
      ProductReviewId,
    );
    try {
      await productReview.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
