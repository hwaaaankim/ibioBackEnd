import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./ProductEntity";

@Entity('product_specifications')
export class ProductSpecificationEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    productId: string

    @Column('varchar')
    name: string

    @Column('varchar')
    value: string

    @ManyToOne(() => ProductEntity, prod => prod.attributes)
    // @JoinColumn({ referencedColumnName: 'id'})
    product: ProductEntity


}