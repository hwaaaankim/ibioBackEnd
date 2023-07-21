import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { ProductDetailEntity } from './ProductDetailEntity';
import { ProductReviewEntity } from 'src/features/product_reviews/data/models/ProductReviewEntity';
import { ProductDiscountEntity } from 'src/features/product_discounts/data/models/ProductDiscountEntity';
import { ProductTagEntity } from 'src/features/product_tags/data/models/ProductTagEntity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false})
  code: string

  @Column('varchar', { nullable: false })
  brand: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('varchar', { nullable: false })
  categoryId: string

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ referencedColumnName: 'id' })
  category: CategoryEntity;

  @OneToMany(() => ProductDetailEntity, (pd) => pd.product, { onDelete: 'CASCADE' })
  @JoinColumn()
  productDetails: ProductDetailEntity

  @OneToMany(() => ProductDiscountEntity, (pd) => pd.product, { onDelete: 'CASCADE' })
  @JoinColumn()
  discounts: ProductDiscountEntity

  @OneToMany(() => ProductReviewEntity, (pd) => pd.product, { onDelete: 'CASCADE' })
  @JoinColumn()
  reviews: ProductDetailEntity

  @OneToMany(() => ProductTagEntity, (pd) => pd.product, { onDelete: 'CASCADE' })
  @JoinColumn()
  tags: ProductDetailEntity
}
