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
  @JoinColumn({ referencedColumnName: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => ProductDetailEntity, (pd) => pd.product, { onDelete: 'CASCADE' })
  @JoinColumn()
  productDetails: ProductDetailEntity
}
