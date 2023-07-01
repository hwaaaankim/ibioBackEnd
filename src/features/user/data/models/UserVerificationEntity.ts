import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('user_verifications')
export class UserVerificationEntity extends BaseEntity {
  @PrimaryColumn('varchar')
  email: string;

  @Column('varchar', { nullable: false })
  verificationCode: string;

  @Column('bool', { nullable: false, default: false })
  verified: boolean;

  @CreateDateColumn()
  created: Date;

  @OneToOne(() => UserEntity, user => user.verification)
  user: UserEntity
}
