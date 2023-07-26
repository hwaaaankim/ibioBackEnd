import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserVerificationEntity } from './UserVerificationEntity';
import { AddressEntity } from './AddressEntity';
import { CommonEntity } from '../../../../database/CommonEntity';
import { Wishlist } from 'src/features/wishlists/domain/WishList'
import { WishlistEntity } from 'src/features/wishlists/data/models/WishlistEntity';

@Entity('users')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  userName: string;

  @Column('varchar', { nullable: false })
  firstName: string;

  @Column('varchar', { nullable: false })
  lastName: string;

  @Column('varchar', { nullable: false, default: 'USER' })
  role: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { unique: true, nullable: false })
  password: string;

  @Column('varchar', { unique: true, nullable: false })
  salt: string;

  @Column('bool', { default: false })
  status: boolean;

  @OneToOne(() => UserVerificationEntity, (ver) => ver.user)
  verification: UserVerificationEntity;

  @OneToOne(() => AddressEntity, (add) => add.user)
  address: AddressEntity;

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user)
  wishlists: WishlistEntity[];
}
