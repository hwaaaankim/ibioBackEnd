import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { ColorEntity } from './ColorEntity';
import { ProductImageEntity } from './ProductImageEntity';
import { ProductReviewEntity } from 'src/features/product_reviews/data/models/ProductReviewEntity';
import { ProductDiscountEntity } from 'src/features/product_discounts/data/models/ProductDiscountEntity';
import { ProductTagEntity } from 'src/features/product_tags/data/models/ProductTagEntity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  brand: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('double', { nullable: false })
  price: number;

  @Column('int', { nullable: true, default: 1 })
  stock: number;

  @Column('varchar', { nullable: false, default: 'NEW' })
  condition: string;

  @Column('varchar', { nullable: false })
  shopId: string;

  @OneToMany(() => ColorEntity, (color) => color.product)
  // @JoinColumn({ referencedColumnName: 'id'})
  colors: ColorEntity[];

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  // @JoinColumn({ referencedColumnName: 'id'})
  images: ProductImageEntity[];

  @OneToMany(() => ProductReviewEntity, (review) => review.product)
  @JoinColumn({ referencedColumnName: 'id' })
  productReviews: ProductReviewEntity[];

  @OneToMany(() => ProductDiscountEntity, (discount) => discount.product)
  @JoinColumn({ referencedColumnName: 'id' })
  productDiscount: ProductReviewEntity[];

  @OneToMany(() => ProductDiscountEntity, (tag) => tag.product)
  @JoinColumn({ referencedColumnName: 'id' })
  productTags: ProductTagEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ referencedColumnName: 'id' })
  category: CategoryEntity;

  // OPTIONAL CLOSING
  @Column('varchar', { nullable: true })
  size: string;

  @Column('varchar', { nullable: true })
  motor_type: string;

  @Column('varchar', { nullable: true })
  year: string;

  @Column('varchar', { nullable: true })
  transmission: string;

  @Column('varchar', { nullable: true })
  fuel: string;
}
