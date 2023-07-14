import { Module } from '@nestjs/common';
import { MemberController } from './MemberController';

@Module({
  imports: [],
  controllers: [MemberController],
  providers: [],
})
export class MemberModule {}
