import { ProductEntity } from '../../../../features/products/data/models/ProductEntity';
import { CommonEntity } from '../../../../database/CommonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagEntity } from '../../../../features/tags/data/models/TagEntity';

@Entity('product_tags')
export class ProductTagEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  productId: string;

  @Column('varchar', { nullable: false })
  tagId: string;

  @ManyToOne(() => ProductEntity, (product) => product.tags)
  @JoinColumn({ referencedColumnName: 'id' })
  product: ProductEntity;

  @ManyToOne(() => TagEntity, (tag) => tag.productTags)
  @JoinColumn({ referencedColumnName: 'id' })
  tag: TagEntity;
}
