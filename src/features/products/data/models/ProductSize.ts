import { CommonEntity } from "src/database/CommonEntity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductDetailEntity } from "./ProductDetailEntity";

@Entity('product_sizes')
export class ProductSizeEntity extends CommonEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false })
    productDetailId: string

    @Column('number', { nullable: false })
    size: number

    @Column('number', { nullable: false })
    quantity: number

    @Column('number', { nullable: true })
    price: number

    @ManyToOne(() => ProductDetailEntity, prod => prod.colors)
    productDetails: ProductDetailEntity

}