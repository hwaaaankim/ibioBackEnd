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
import { ProductSpecificationEntity } from './ProductSpecificationEntity';
import { ProductColorEntity } from './ProductColorEntity';
import { ProductMediaEntity } from './ProductMediaEntity';
import { ProductSizeEntity } from './ProductSizeEntity';

export enum ProductStatusEnum  { IN_STOCK, OUT_OF_STOCK, COMING_SOON, UNAVAILABLE }
@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  code: string;

  @Column('enum', { nullable: false, default: ProductStatusEnum.IN_STOCK })
  status: ProductStatusEnum;

  @Column('text', { nullable: false })
  description: string;

  @Column('varchar', { nullable: false })
  categoryId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ referencedColumnName: 'id' })
  category: CategoryEntity;

  @OneToMany(() => ProductDetailEntity, (pd) => pd.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  productDetails: ProductDetailEntity;

  @OneToMany(() => ProductColorEntity, (color) => color.product, {
    onDelete: 'CASCADE',
  })
  // @JoinColumn({ referencedColumnName: 'id'})
  colors: ProductColorEntity[];

  @OneToMany(() => ProductMediaEntity, (image) => image.product, {
    onDelete: 'CASCADE',
  })
  // @JoinColumn({ referencedColumnName: 'id'})
  images: ProductMediaEntity[];

  @OneToMany(() => ProductSizeEntity, (pz) => pz.product, {
    onDelete: 'CASCADE',
  })
  sizes: ProductSizeEntity[];

  @OneToMany(() => ProductDiscountEntity, (pd) => pd.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  discounts: ProductDiscountEntity;

  @OneToMany(() => ProductReviewEntity, (pd) => pd.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  reviews: ProductDetailEntity;

  @OneToMany(() => ProductTagEntity, (pd) => pd.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tags: ProductDetailEntity;

  @OneToMany(() => ProductSpecificationEntity, (pd) => pd.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  attributes: ProductSpecificationEntity;


}
