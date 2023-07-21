import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { BlogEntity } from './BlogEntity';

@Entity('blog_images')
export class BlogImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  blogId: string;

  @Column('varchar', { nullable: false })
  image: string;

  @OneToOne(() => BlogEntity, (blog) => blog.image)
  // @JoinColumn({ referencedColumnName: 'id'})
  blog: BlogEntity;
}