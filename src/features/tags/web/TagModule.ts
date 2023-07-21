import { Module } from '@nestjs/common';
import { TagController } from './TagController';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [],
})
export class TagModule {}
