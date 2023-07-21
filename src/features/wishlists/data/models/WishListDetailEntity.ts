import { CommonEntity } from '../../../../database/CommonEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WishlistEntity } from './WishlistEntity';

@Entity('wishlist_details')
export class WishlistDetailEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  wishlistId: string;

  @Column('varchar', { nullable: false })
  productOptionId: string;

  @ManyToOne(() => WishlistEntity, (wishlist) => wishlist.details, {
    cascade: ['soft-remove'],
  })
  wishlist: WishlistEntity;
}
