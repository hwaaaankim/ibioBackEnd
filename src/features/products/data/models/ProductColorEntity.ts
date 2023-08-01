import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductDetailEntity } from "./ProductDetailEntity";
import { ProductEntity } from "./ProductEntity";


@Entity('product_colors')
export class ProductColorEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false })
    color: string

    @Column('varchar', { nullable: false })
    productId: string

    @ManyToOne(() => ProductEntity, prod => prod.colors)
    // @JoinColumn({ referencedColumnName: 'id'})
    product: ProductEntity

}