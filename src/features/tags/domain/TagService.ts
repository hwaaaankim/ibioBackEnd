import { AddTagDto } from '../data/dtos/AddTagDto';
import { UpdateTagDto } from '../data/dtos/UpdateTagDto';
import { Tag } from './Tag';

export class TagService implements Tag {
  repository: Tag;

  addTag(newTag: AddTagDto): boolean {
    return this.repository.addTag(newTag);
  }
  getTag(tagId: string): any {
    return this.repository.getTag(tagId);
  }
  getTags(): any {
    return this.repository.getTags();
  }
  updateTag(tagId: string, updatedTag: UpdateTagDto): boolean {
    return this.repository.updateTag(tagId, updatedTag);
  }
  deleteTag(tagId: string): boolean {
    return this.repository.deleteTag(tagId);
  }
}
