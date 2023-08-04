import { CommonEntity } from 'src/database/CommonEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('currencies')
export class CurrencyEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  code: string;

  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @Column('int', { nullable: false })
  decimalPlaces: number;

  @Column('varchar', { nullable: true })
  displaySymbol: string;

  @Column('boolean', { default: false })
  isDefault: boolean;
}
