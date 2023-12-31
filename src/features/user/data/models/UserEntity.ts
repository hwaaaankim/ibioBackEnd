import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserVerificationEntity } from './UserVerificationEntity';
import { AddressEntity } from './AddressEntity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  firstName: string;

  @Column('varchar', { nullable: false })
  lastName: string;

  @Column('varchar', { nullable: false, default: 'USER' })
  role: string;
  
  @Column('int', { unique: true, nullable: false })
  fax: number;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { unique: true, nullable: false })
  telephone: string;

  @Column('varchar', { unique: true, nullable: false })
  password: string;

  @Column('varchar', { unique: true, nullable: false })
  salt: string;

  @Column('bool', { default: false })
  status: boolean;

  @CreateDateColumn()
  created: Date

  @OneToOne(() => UserVerificationEntity, ver => ver.user)
  verification: UserVerificationEntity

  @OneToOne(() => AddressEntity, add => add.user)
  address: AddressEntity


}
