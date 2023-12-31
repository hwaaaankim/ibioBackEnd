import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('address')
export class AddressEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    company: string;

    @Column('varchar', { nullable: false })
    address: string;

    @Column('varchar', { nullable: true })
    addressTwo: string;

    @Column('varchar', { nullable: false })
    city: string;

    @Column('varchar', { nullable: false })
    postCode: string;

    @Column('varchar', { default: 'south korea'})
    country: string;

    @Column('varchar', { nullable: false })
    state: string;

    @Column('varchar')
    userId: string;

    @OneToOne(() => UserEntity, user => user.address)
    @JoinColumn({ referencedColumnName: 'id' })
    user: UserEntity

}