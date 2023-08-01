import { AddProductReviewDto } from '../data/dtos/AddProductReviewDto';
import { UpdateProductReviewDto } from '../data/dtos/UpdateProductReviewDto';
import { ProductReview } from './ProductReview';

export class ProductReviewService implements ProductReview {
  repository: ProductReview;

  addProductReview(newProductReview: AddProductReviewDto): boolean {
    return this.repository.addProductReview(newProductReview);
  }
  getProductReview(productReviewId: string): any {
    return this.repository.getProductReview(productReviewId);
  }

  getProductReviews(): any {
    return this.repository.getProductReviews();
  }
  getProductRates(): any {
    return this.repository.getProductRates();
  }
  getProductRate(productId: string): any {
    return this.repository.getProductRate(productId);
  }
  updateProductReview(
    productReviewId: string,
    updatedProductReview: UpdateProductReviewDto,
  ): boolean {
    return this.repository.updateProductReview(
      productReviewId,
      updatedProductReview,
    );
  }
  deleteProductReview(productReviewId: string): boolean {
    return this.repository.deleteProductReview(productReviewId);
  }
}
