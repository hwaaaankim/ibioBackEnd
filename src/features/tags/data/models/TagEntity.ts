import { ProductTagEntity } from 'src/features/product_tags/data/models/ProductTagEntity';
import { CommonEntity } from '../../../../database/CommonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tags')
export class TagEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @OneToMany(() => ProductTagEntity, (productTag) => productTag.tag)
  @JoinColumn({ referencedColumnName: 'id' })
  productTags: ProductTagEntity[];
}
