import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { ColorEntity } from './ColorEntity';
import { ProductImageEntity } from './ProductImageEntity';

@Entity('products')
export class ProductEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false } )
    name: string

    @Column('varchar', { nullable: false })
    brand: string

    @Column('text', { nullable: false})
    description: string

    @Column('double', { nullable: false} )
    price: number

    @Column('int', { nullable: true, default: 1 })
    stock: number

    @Column('varchar', { nullable: false, default: 'NEW' })
    condition: string

    @Column('varchar', { nullable: false })
    shopId: string

    @OneToMany(() => ColorEntity, color => color.product)
    // @JoinColumn({ referencedColumnName: 'id'})
    colors: ColorEntity[]

    @OneToMany(() => ProductImageEntity, image => image.product)
    // @JoinColumn({ referencedColumnName: 'id'})
    images: ProductImageEntity[]

    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({referencedColumnName: 'id'})
    category: CategoryEntity
    
    // OPTIONAL CLOSING
    @Column('varchar', { nullable: true })
    size: string

    @Column('varchar', { nullable: true })
    motor_type: string

    @Column('varchar', { nullable: true })
    year: string

    @Column('varchar', { nullable: true })
    transmission: string

    @Column('varchar', { nullable: true })
    fuel: string

}