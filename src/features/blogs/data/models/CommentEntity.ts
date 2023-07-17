import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BlogEntity } from "./BlogEntity";


@Entity('blog_comments')
export class CommentEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false })
    code: string

    @Column('varchar', { nullable: false })
    fullName: string

    @Column('varchar', { nullable: false })
    comment: string

    @ManyToOne(() => BlogEntity, blog => blog.comments)
    // @JoinColumn({ referencedColumnName: 'id'})
    blog: BlogEntity

}