import { ProductEntity } from 'src/features/products/data/models/ProductEntity';
import { CommonEntity } from '../../../../database/CommonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_discounts')
export class ProductDiscountEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  productId: string;

  @Column('decimal', { nullable: false })
  discountPercent: Number;

  @Column('date', { nullable: false })
  validUntil: Date;

  @ManyToOne(() => ProductEntity, (product) => product.productDiscount)
  @JoinColumn({ referencedColumnName: 'id' })
  product: ProductEntity;
}
