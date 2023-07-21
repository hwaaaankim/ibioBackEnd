import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductDetailEntity } from "./ProductDetailEntity";


@Entity('product_colors')
export class ProductColorEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false })
    color: string

    @Column('varchar', { nullable: false })
    productDetailId: string

    @ManyToOne(() => ProductDetailEntity, prod => prod.colors)
    // @JoinColumn({ referencedColumnName: 'id'})
    productDetails: ProductDetailEntity

}