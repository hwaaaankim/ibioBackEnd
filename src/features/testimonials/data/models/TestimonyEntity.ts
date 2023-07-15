import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('testimonials')
export class TestimonyEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false } )
    fullName: string

    @Column('varchar', { nullable: false } )
    role: string


    @Column('text', { nullable: false})
    description: string

    @CreateDateColumn()
    created_at : Date

    @DeleteDateColumn()
    deleted_at : Date

}