import { ProductDiscountEntity } from './models/ProductDiscountEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ProductDiscount } from '../domain/ProductDiscount';
import { AddProductDiscountDto } from './dtos/AddProductDiscountDto';
import { UpdateProductDiscountDto } from './dtos/UpdateProductDiscountDto';
import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';
import { getTodayDate } from '../../../util/date/today';
import { ValidationException } from '../../../util/exception/ValidationException';
import { MoreThanOrEqual } from 'typeorm';

export class ProductDiscountRepository implements ProductDiscount {
  entity: EntityClassOrSchema = ProductDiscountEntity;
  productDiscountRepository = AppDataSource.getRepository(this.entity);

  async addProductDiscount(
    newProductDiscount: AddProductDiscountDto,
  ): Promise<boolean> {
    try {
      if (newProductDiscount.validUntil < getTodayDate()) {
        throw new ValidationException('The date is invalid!');
      }
      await this.productDiscountRepository.create(newProductDiscount).save();
      return true;
    } catch (e) {
      throw new SystemErrorException(e);
    }
  }

  async getProductDiscount(productDiscountId: string): Promise<any> {
    const productDiscount = await this.productDiscountRepository.findOne({
      where: {
        id: productDiscountId,
        validUntil: MoreThanOrEqual(getTodayDate()),
      },
    });
    if (!productDiscount) {
      throw new DataNotFoundException('Product discount not dound');
    }
    return productDiscount;
  }

  async getProductDiscounts(): Promise<any> {
    const productDiscounts = await this.productDiscountRepository.find({
      where: { validUntil: MoreThanOrEqual(getTodayDate()) },
    });
    if (!productDiscounts)
      throw new DataNotFoundException(
        'No Product discounts have been created yet',
      );
    return productDiscounts;
  }

  async updateProductDiscount(
    productDiscountId: string,
    updatedProductDiscount: UpdateProductDiscountDto,
  ): Promise<boolean> {
    const productDiscount: ProductDiscountEntity =
      await this.getProductDiscount(productDiscountId);

    if (updatedProductDiscount.productId)
      productDiscount.productId = updatedProductDiscount.productId;
    if (updatedProductDiscount.discountPercent)
      productDiscount.discountPercent = updatedProductDiscount.discountPercent;
    if (updatedProductDiscount.validUntil)
      productDiscount.validUntil = updatedProductDiscount.validUntil;
    try {
      await productDiscount.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deleteProductDiscount(productDiscountId: string): Promise<boolean> {
    const productDiscount: ProductDiscountEntity =
      await this.getProductDiscount(productDiscountId);
    try {
      await productDiscount.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
