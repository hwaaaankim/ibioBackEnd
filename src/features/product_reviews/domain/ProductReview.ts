import { AddProductReviewDto } from '../data/dtos/AddProductReviewDto';
import { UpdateProductReviewDto } from '../data/dtos/UpdateProductReviewDto';

export interface ProductReview {
  addProductReview(newProductReview: AddProductReviewDto): any;
  getProductReview(productReviewId: string): any;
  getProductReviews(): any;
  updateProductReview(
    productReviewId: string,
    updatedProductReview: UpdateProductReviewDto,
  ): any;
  deleteProductReview(productReviewId: string): any;
}
