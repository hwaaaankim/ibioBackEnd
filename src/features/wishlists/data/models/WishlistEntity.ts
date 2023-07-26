import { UserEntity } from 'src/features/user/data/models/UserEntity';
import { CommonEntity } from '../../../../database/CommonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WishlistDetailEntity } from './WishListDetailEntity';
import { ProductDetailEntity } from 'src/features/products/data/models/ProductDetailEntity';

@Entity('wishlists')
export class WishlistEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  productDetailId: string;

  @Column('varchar', { nullable: false })
  userId: string;

  @Column('int', { nullable: false })
  quantity: number;

  @Column('date', { nullable: false })
  wishlistDate: Date;

  @Column('boolean', { nullable: false })
  status: boolean;

  @ManyToOne(() => UserEntity, (user) => user.wishlists)
  user: UserEntity;

  @OneToMany(() => WishlistDetailEntity, (detail) => detail.wishlist)
  details: WishlistDetailEntity[];

  @ManyToOne(() => ProductDetailEntity, (product) => product.wishlists)
  @JoinColumn({ referencedColumnName: 'id' })
  productDetail: ProductDetailEntity;
}
