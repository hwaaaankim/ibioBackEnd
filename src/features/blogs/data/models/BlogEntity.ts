import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { BlogImageEntity } from './BlogImageEntity';
import { CommentEntity } from './CommentEntity';

@Entity('blogs')
export class BlogEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', { nullable: false } )
    title: string

    @Column('text', { nullable: false})
    content: string

    @Column('varchar', {nullable: false})
    postedById: string

    @OneToOne(() => BlogImageEntity, image => image.blog)
    @JoinColumn({ referencedColumnName: 'id'})
    image: BlogImageEntity

    @OneToMany(() => CommentEntity, comment => comment.blog)
    @JoinColumn({ referencedColumnName: 'id'})
    comments: CommentEntity[]

    @ManyToOne(() => CategoryEntity, category => category.blogs)
    @JoinColumn({referencedColumnName: 'id'})
    category: CategoryEntity
    
    @CreateDateColumn()
    created_at: Date

    @DeleteDateColumn()
    Deleted_at: Date
}