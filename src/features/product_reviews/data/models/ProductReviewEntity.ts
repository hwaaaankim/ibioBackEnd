import { ProductEntity } from 'src/features/products/data/models/ProductEntity';
import { CommonEntity } from '../../../../database/CommonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_reviews')
export class ProductReviewEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  fullName: string;

  @Column('varchar', { nullable: false })
  productId: string;

  @Column('text', { nullable: true })
  review: string;

  @Column('int', { nullable: false })
  rating: number;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  @JoinColumn({ referencedColumnName: 'id' })
  product: ProductEntity;
}
