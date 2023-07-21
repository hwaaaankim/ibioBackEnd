import { AddProductTagDto } from '../data/dtos/AddProductTagDto';
import { UpdateProductTagDto } from '../data/dtos/UpdateProductTagDto';

export interface ProductTag {
  addProductTag(newProductTag: AddProductTagDto): any;
  getProductTag(ProductTagId: string): any;
  getProductTags(): any;
  updateProductTag(
    ProductTagId: string,
    updatedProductTag: UpdateProductTagDto,
  ): any;
  deleteProductTag(ProductTagId: string): any;
}
