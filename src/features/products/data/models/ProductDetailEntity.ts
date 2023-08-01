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
import { CommonEntity } from 'src/database/CommonEntity';
import { ProductEntity } from './ProductEntity';
import { ProductSizeEntity } from './ProductSizeEntity';
import { WishlistEntity } from 'src/features/wishlists/data/models/WishlistEntity';

@Entity('products_details')
export class ProductDetailEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  productId: string;

  @Column('double', { nullable: false })
  basePrice: number;

  @Column('int', { nullable: true, default: 1 })
  quantity: number;

  @Column('boolean', { default: true })
  isAvailable: string;

  @Column('varchar')
  currencyId: string

  @ManyToOne(() => ProductEntity, (product) => product.productDetails)
  @JoinColumn()
  product: ProductEntity;

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.productDetail, {
    onDelete: 'CASCADE',
  })
  wishlists: WishlistEntity[];
}
