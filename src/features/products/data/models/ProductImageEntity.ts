import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProductEntity } from "./ProductEntity";

@Entity('product_images')
export class ProductImageEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false})
    productId: string

    @Column('varchar', { nullable: false} )
    image: string

    @ManyToOne(() => ProductEntity, prod => prod.colors)
    // @JoinColumn({ referencedColumnName: 'id'})
    product: ProductEntity

}