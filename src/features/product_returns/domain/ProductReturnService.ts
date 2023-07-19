import { AddProductReturnDto } from '../data/dtos/AddProductReturnDto';
import { UpdateProductReturnDto } from '../data/dtos/UpdateProductReturnDto';
import { ProductReturn } from './ProductReturn';

export class ProductReturnService implements ProductReturn {
  repository: ProductReturn;

  addProductReturn(newProductReturn: AddProductReturnDto): boolean {
    return this.repository.addProductReturn(newProductReturn);
  }
  getProductReturn(ProductReturnId: string): any {
    return this.repository.getProductReturn(ProductReturnId);
  }
  getProductReturns(): any {
    return this.repository.getProductReturns();
  }
  updateProductReturn(
    ProductReturnId: string,
    updatedProductReturn: UpdateProductReturnDto,
  ): boolean {
    return this.repository.updateProductReturn(
      ProductReturnId,
      updatedProductReturn,
    );
  }
  deleteProductReturn(ProductReturnId: string): boolean {
    return this.repository.deleteProductReturn(ProductReturnId);
  }
}
