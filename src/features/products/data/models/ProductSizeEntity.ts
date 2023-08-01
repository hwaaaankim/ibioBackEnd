import { CommonEntity } from "src/database/CommonEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetailEntity } from "./ProductDetailEntity";
import { ProductEntity } from "./ProductEntity";

@Entity('product_sizes')
export class ProductSizeEntity extends CommonEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false })
    productId: string

    @Column('int', { nullable: false })
    value: number

    @ManyToOne(() => ProductEntity, prod => prod.colors)
    product: ProductEntity

}