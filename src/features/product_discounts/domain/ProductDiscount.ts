import { AddProductDiscountDto } from '../data/dtos/AddProductDiscountDto';
import { UpdateProductDiscountDto } from '../data/dtos/UpdateProductDiscountDto';

export interface ProductDiscount {
  addProductDiscount(newProductDiscount: AddProductDiscountDto): any;
  getProductDiscount(productDiscountId: string): any;
  getProductDiscounts(): any;
  updateProductDiscount(
    productDiscountId: string,
    updatedProductDiscount: UpdateProductDiscountDto,
  ): any;
  deleteProductDiscount(productDiscountId: string): any;
}
