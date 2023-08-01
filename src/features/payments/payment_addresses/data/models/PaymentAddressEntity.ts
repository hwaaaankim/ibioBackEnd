import { UserEntity } from '../../../../../features/user/data/models/UserEntity';
import { CommonEntity } from '../../../../../database/CommonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StateEntity } from 'src/features/states/data/models/StateEntity';

@Entity('payment_addresses')
export class PaymentAddressEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  userId: string;

  @Column('varchar', { nullable: false })
  stateId: string;

  @Column('varchar', { nullable: false })
  city: string;

  @Column('varchar', { nullable: true })
  company: string;

  @Column('varchar', { nullable: false })
  telephone: string;

  @Column('varchar', { nullable: false })
  addressOne: string;

  @Column('varchar', { nullable: true })
  addressTwo: string;

  @Column('int', { unique: true, nullable: false })
  fax: number;

  @Column('int', { nullable: false })
  postCode: number;

  @ManyToOne(() => UserEntity, (user) => user.paymentAddresses)
  @JoinColumn({ referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => StateEntity, (state) => state.paymentAddresses)
  @JoinColumn({ referencedColumnName: 'id' })
  state: StateEntity;
}
