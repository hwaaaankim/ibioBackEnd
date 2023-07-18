import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './ProductEntity';
import { CommonEntity } from 'src/database/CommonEntity';

@Entity('categories')
export class CategoryEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  parentId: string;

  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  @JoinColumn({ referencedColumnName: 'categoryId' })
  products: ProductEntity[];
}
