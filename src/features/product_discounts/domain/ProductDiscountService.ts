import { AddProductDiscountDto } from '../data/dtos/AddProductDiscountDto';
import { UpdateProductDiscountDto } from '../data/dtos/UpdateProductDiscountDto';
import { ProductDiscount } from './ProductDiscount';

export class ProductDiscountService implements ProductDiscount {
  repository: ProductDiscount;

  addProductDiscount(newProductDiscount: AddProductDiscountDto): boolean {
    return this.repository.addProductDiscount(newProductDiscount);
  }
  getProductDiscount(productDiscountId: string): any {
    return this.repository.getProductDiscount(productDiscountId);
  }
  getProductDiscounts(): any {
    return this.repository.getProductDiscounts();
  }
  updateProductDiscount(
    productDiscountId: string,
    updatedProductDiscount: UpdateProductDiscountDto,
  ): boolean {
    return this.repository.updateProductDiscount(
      productDiscountId,
      updatedProductDiscount,
    );
  }
  deleteProductDiscount(productDiscountId: string): boolean {
    return this.repository.deleteProductDiscount(productDiscountId);
  }
}
