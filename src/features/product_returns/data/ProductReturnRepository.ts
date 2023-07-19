import { ProductReturnEntity } from './models/ProductReturnEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ProductReturn } from '../domain/ProductReturn';
import { AddProductReturnDto } from './dtos/AddProductReturnDto';
import { UpdateProductReturnDto } from './dtos/UpdateProductReturnDto';
import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';

export class ProductReturnRepository implements ProductReturn {
  entity: EntityClassOrSchema = ProductReturnEntity;
  ProductReturnRepository = AppDataSource.getRepository(this.entity);

  async addProductReturn(
    newProductReturn: AddProductReturnDto,
  ): Promise<boolean> {
    try {
      await this.ProductReturnRepository.create(newProductReturn).save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('ProductReturn already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getProductReturn(ProductReturnId: string): Promise<any> {
    const ProductReturn = await this.ProductReturnRepository.findOne({
      where: { id: ProductReturnId },
    });
    if (!ProductReturn) {
      throw new DataNotFoundException('ProductReturn not dound');
    }
    return ProductReturn;
  }

  async getProductReturns(): Promise<any> {
    const ProductReturns = await this.ProductReturnRepository.find();
    if (!ProductReturns)
      throw new DataNotFoundException(
        'No ProductReturns have been created yet',
      );
    return ProductReturns;
  }

  async updateProductReturn(
    ProductReturnId: string,
    updatedProductReturn: UpdateProductReturnDto,
  ): Promise<boolean> {
    const ProductReturn: ProductReturnEntity = await this.getProductReturn(
      ProductReturnId,
    );
    if (updatedProductReturn.productId)
      ProductReturn.productId = updatedProductReturn.productId;
    if (updatedProductReturn.review)
      ProductReturn.review = updatedProductReturn.review;
    if (updatedProductReturn.rating)
      ProductReturn.rating = updatedProductReturn.rating;
    try {
      await ProductReturn.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deleteProductReturn(ProductReturnId: string): Promise<boolean> {
    const ProductReturn: ProductReturnEntity = await this.getProductReturn(
      ProductReturnId,
    );
    try {
      await ProductReturn.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
