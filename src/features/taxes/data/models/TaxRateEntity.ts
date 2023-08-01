import { CommonEntity } from '../../../../database/CommonEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaxEntity } from './TaxEntity';
import { StateEntity } from 'src/features/states/data/models/StateEntity';

@Entity('tax_rates')
export class TaxRateEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  taxId: string;

  @Column('varchar', { nullable: false })
  stateId: string;

  @Column('decimal', { nullable: false })
  percent: number;

  @ManyToOne(() => TaxEntity, (tax) => tax.taxRates)
  tax: TaxEntity;

  @ManyToOne(() => StateEntity, (state) => state.taxRates)
  state: TaxEntity;
}
