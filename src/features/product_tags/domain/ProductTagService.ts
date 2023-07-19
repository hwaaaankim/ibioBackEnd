import { AddProductTagDto } from '../data/dtos/AddProductTagDto';
import { UpdateProductTagDto } from '../data/dtos/UpdateProductTagDto';
import { ProductTag } from './ProductTag';

export class ProductTagService implements ProductTag {
  repository: ProductTag;

  addProductTag(newProductTag: AddProductTagDto): boolean {
    return this.repository.addProductTag(newProductTag);
  }
  getProductTag(ProductTagId: string): any {
    return this.repository.getProductTag(ProductTagId);
  }
  getProductTags(): any {
    return this.repository.getProductTags();
  }
  updateProductTag(
    ProductTagId: string,
    updatedProductTag: UpdateProductTagDto,
  ): boolean {
    return this.repository.updateProductTag(ProductTagId, updatedProductTag);
  }
  deleteProductTag(ProductTagId: string): boolean {
    return this.repository.deleteProductTag(ProductTagId);
  }
}
