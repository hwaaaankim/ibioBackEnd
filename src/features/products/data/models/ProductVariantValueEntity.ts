import { CommonEntity } from "src/database/CommonEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_variants_value')
export class ProductVariantEntity extends CommonEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false })
    productDetailId: string

    @Column('varchar' , { nullable: true })
    productSizeId: string

    @Column('varchar' , { nullable: true })
    productColorId: string

    @Column('int' , { nullable: false })
    quantity: number

    @Column('double', { nullable: true })
    colorPrice: number

    @Column('double', { nullable: true })
    sizePrice: number

    @Column('boolean', { default: true })
    isAvailable: boolean


}