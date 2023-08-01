import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProductEntity } from "./ProductEntity";
import { ProductDetailEntity } from "./ProductDetailEntity";

@Entity('product_media')
export class ProductMediaEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false})
    productId: string

    @Column('varchar', { nullable: false} )
    type: string

    @Column('varchar', { nullable: false} )
    title: string

    @ManyToOne(() => ProductEntity, prod => prod.colors)
    product: ProductEntity

}