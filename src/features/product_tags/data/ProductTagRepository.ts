import { ProductTagEntity } from './models/ProductTagEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ProductTag } from '../domain/ProductTag';
import { AddProductTagDto } from './dtos/AddProductTagDto';
import { UpdateProductTagDto } from './dtos/UpdateProductTagDto';
import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';

export class ProductTagRepository implements ProductTag {
  entity: EntityClassOrSchema = ProductTagEntity;
  productTagRepository = AppDataSource.getRepository(this.entity);

  async addProductTag(newProductTag: AddProductTagDto): Promise<boolean> {
    try {
      await this.productTagRepository.create(newProductTag).save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('ProductTag already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getProductTag(productTagId: string): Promise<any> {
    const productTag = await this.productTagRepository.findOne({
      where: { id: productTagId },
    });
    if (!productTag) {
      throw new DataNotFoundException('ProductTag not dound');
    }
    return productTag;
  }

  async getProductTags(): Promise<any> {
    const ProductTags = await this.productTagRepository.find();
    if (!ProductTags)
      throw new DataNotFoundException('No ProductTags have been created yet');
    return ProductTags;
  }

  async updateProductTag(
    ProductTagId: string,
    updatedProductTag: UpdateProductTagDto,
  ): Promise<boolean> {
    const productTag: ProductTagEntity = await this.getProductTag(ProductTagId);

    if (updatedProductTag.productId)
      productTag.productId = updatedProductTag.productId;
    if (updatedProductTag.tagId) productTag.tagId = updatedProductTag.tagId;

    try {
      await productTag.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deleteProductTag(productTagId: string): Promise<boolean> {
    const productTag: ProductTagEntity = await this.getProductTag(productTagId);
    try {
      await productTag.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
