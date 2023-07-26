import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';
import { CommonEntity } from 'src/database/CommonEntity';

@Entity('address')
export class AddressEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  company: string;

  @Column('varchar', { unique: true, nullable: false })
  telephone: string;

  @Column('varchar', { nullable: false })
  address: string;

  @Column('int', { unique: true, nullable: false })
  fax: number;

  @Column('varchar', { nullable: true })
  addressTwo: string;

  @Column('varchar', { nullable: false })
  city: string;

  @Column('varchar', { unique: true, nullable: false })
  postCode: string;

  @Column('varchar', { default: 'south korea' })
  country: string;

  @Column('varchar', { nullable: false })
  state: string;

  @Column('varchar')
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.address)
  @JoinColumn({ referencedColumnName: 'id' })
  user: UserEntity;
}
