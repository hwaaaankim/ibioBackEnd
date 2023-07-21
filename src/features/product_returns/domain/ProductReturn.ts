import { AddProductReturnDto } from '../data/dtos/AddProductReturnDto';
import { UpdateProductReturnDto } from '../data/dtos/UpdateProductReturnDto';

export interface ProductReturn {
  addProductReturn(newProductReturn: AddProductReturnDto): any;
  getProductReturn(ProductReturnId: string): any;
  getProductReturns(): any;
  updateProductReturn(
    ProductReturnId: string,
    updatedProductReturn: UpdateProductReturnDto,
  ): any;
  deleteProductReturn(ProductReturnId: string): any;
}
