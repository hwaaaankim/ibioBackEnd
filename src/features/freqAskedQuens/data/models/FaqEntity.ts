import { BaseEntity, Column, Entity, DeleteDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('faqs')
export class FaqEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', { nullable: false } )
    question: string

    @Column('text', { nullable: false })
    answer: string

    @CreateDateColumn()
    created_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
}