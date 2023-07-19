import { AddTagDto } from '../data/dtos/AddTagDto';
import { UpdateTagDto } from '../data/dtos/UpdateTagDto';

export interface Tag {
  addTag(newTag: AddTagDto): any;
  getTag(tagId: string): any;
  getTags(): any;
  updateTag(tagId: string, updatedTag: UpdateTagDto): any;
  deleteTag(tagId: string): any;
}
