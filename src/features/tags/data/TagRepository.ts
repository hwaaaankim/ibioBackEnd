import { TagEntity } from './models/TagEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Tag } from '../domain/Tag';
import { AddTagDto } from './dtos/AddTagDto';
import { UpdateTagDto } from './dtos/UpdateTagDto';
import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';

export class TagRepository implements Tag {
  entity: EntityClassOrSchema = TagEntity;
  tagRepository = AppDataSource.getRepository(this.entity);

  async addTag(newTag: AddTagDto): Promise<boolean> {
    try {
      await this.tagRepository.create(newTag).save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Tag already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getTag(tagId: string): Promise<any> {
    const tag = await this.tagRepository.findOne({
      where: { id: tagId },
    });
    if (!tag) {
      throw new DataNotFoundException('Tag not dound');
    }
    return tag;
  }

  async getTags(): Promise<any> {
    const tags = await this.tagRepository.find();
    if (!tags) throw new DataNotFoundException('No Tags have been created yet');
    return tags;
  }

  async updateTag(tagId: string, updatedTag: UpdateTagDto): Promise<boolean> {
    const tag: TagEntity = await this.getTag(tagId);

    if (updatedTag.name) tag.name = updatedTag.name;

    try {
      await tag.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deleteTag(tagId: string): Promise<boolean> {
    const tag: TagEntity = await this.getTag(tagId);
    try {
      await tag.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
