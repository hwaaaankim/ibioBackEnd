import { ProductEntity } from 'src/features/products/data/models/ProductEntity';
import { CommonEntity } from '../../../../database/CommonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_return')
export class ProductReturnEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  userId: string;

  @Column('varchar', { nullable: false })
  productId: string;

  @Column('text', { nullable: true })
  review: string;

  @Column('int', { nullable: false })
  rating: number;
}
