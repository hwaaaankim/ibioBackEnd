import { CommonEntity } from '../../../../database/CommonEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaxRateEntity } from './TaxRateEntity';

@Entity('taxes')
export class TaxEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @OneToMany(() => TaxRateEntity, (rate) => rate.tax)
  taxRates: TaxRateEntity[];
}
