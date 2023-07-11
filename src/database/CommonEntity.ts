import { BaseEntity, CreateDateColumn, DeleteDateColumn } from 'typeorm';

export class CommonEntity extends BaseEntity {
  @DeleteDateColumn()
  deletedAt: Date;

  @CreateDateColumn()
  created: Date;
}
