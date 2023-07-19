import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  Delete,
  ValidationPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { AddTagDto } from '../data/dtos/AddTagDto';
import { UpdateTagDto } from '../data/dtos/UpdateTagDto';
import { TagService } from '../domain/TagService';
import { Role } from '../../../util/decorators/Role';

@Controller('Tags')
export class TagController {
  tagService: TagService;

  constructor() {
    this.tagService = new TagService();
    this.tagService.repository = DatabaseFactory.getRepository('Tag');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addTag(@Body() newTag: AddTagDto) {
    return this.tagService.addTag(newTag);
  }

  @Get(':id')
  getTag(@Param('id') tagId: string): any {
    return this.tagService.getTag(tagId);
  }

  @Get()
  getTags(): any {
    return this.tagService.getTags();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateTag(@Param('id') tagId: string, @Body() updatedTag: UpdateTagDto): any {
    return this.tagService.updateTag(tagId, updatedTag);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteTag(@Param('id') tagId: string): any {
    return this.tagService.deleteTag(tagId);
  }
}
