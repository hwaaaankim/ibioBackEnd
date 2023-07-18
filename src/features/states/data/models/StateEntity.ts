import { CommonEntity } from '../../../../database/CommonEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('states')
export class StateEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  name: string;
}
