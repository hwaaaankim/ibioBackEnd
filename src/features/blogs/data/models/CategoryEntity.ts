import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BlogEntity } from './BlogEntity';
import { CommonEntity } from 'src/database/CommonEntity';

@Entity('blog_categories')
export class CategoryEntity extends CommonEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false, unique: true } )
    name: string

    @OneToMany(() => BlogEntity, blog => blog.category)
    @JoinColumn({referencedColumnName: 'categoryId'})
    blogs: BlogEntity[]  

}