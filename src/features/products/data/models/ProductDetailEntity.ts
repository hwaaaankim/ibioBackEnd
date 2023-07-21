import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { ProductColorEntity } from './ProductColorEntity';
  import { ProductImageEntity } from './ProductImageEntity';
import { CommonEntity } from 'src/database/CommonEntity';
import { ProductEntity } from './ProductEntity';
import { ProductSizeEntity } from './ProductSize';
  
  @Entity('products')
  export class ProductDetailEntity extends CommonEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('varchar', { nullable: false })
    productId: string;
  
    @Column('varchar', { nullable: false })
    model: string;
  
    @Column('text', { nullable: false })
    features: string;
  
    @Column('double', { nullable: false })
    regularPrice: number;
  
    @Column('int', { nullable: true, default: 1 })
    quantity: number;
  
    @Column('varchar', { nullable: false, default: 'NEW' })
    condition: string;
  
    // OPTIONAL CLOSING
    @Column('varchar', { nullable: true })
    size: string;

    @ManyToOne(() => ProductEntity, (product) => product.productDetails)
    @JoinColumn()
    product: ProductEntity;

    @OneToMany(() => ProductColorEntity, (color) => color.productDetails, { onDelete: 'CASCADE' })
    // @JoinColumn({ referencedColumnName: 'id'})
    colors: ProductColorEntity[];
  
    @OneToMany(() => ProductImageEntity, (image) => image.productDetails, { onDelete: 'CASCADE' } )
    // @JoinColumn({ referencedColumnName: 'id'})
    images: ProductImageEntity[];

    @OneToMany(() => ProductSizeEntity, (pz) => pz.productDetails, { onDelete: 'CASCADE'})
    sizes: ProductSizeEntity[]
    

  }
  