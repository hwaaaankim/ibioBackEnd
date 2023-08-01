import { TaxRateEntity } from 'src/features/taxes/data/models/TaxRateEntity';
import { CommonEntity } from '../../../../database/CommonEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentAddressEntity } from 'src/features/addresses/data/models/PaymentAddressEntity';
import { ShippingAddressEntity } from 'src/features/addresses/data/models/ShippingAddressEntity';

@Entity('states')
export class StateEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @OneToMany(() => TaxRateEntity, (rate) => rate.state)
  taxRates: TaxRateEntity[];

  @OneToMany(
    () => PaymentAddressEntity,
    (paymentAddress) => paymentAddress.state,
  )
  paymentAddresses: PaymentAddressEntity[];

  @OneToMany(
    () => ShippingAddressEntity,
    (shippingAddress) => shippingAddress.state,
  )
  shippingAddresses: ShippingAddressEntity[];
}
