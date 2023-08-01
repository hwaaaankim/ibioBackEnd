import { Module } from '@nestjs/common';
import { StateController } from './StateController';

@Module({
  imports: [],
  controllers: [StateController],
  providers: [],
})
export class StateModule {}
