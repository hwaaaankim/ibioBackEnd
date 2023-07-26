import { Module } from '@nestjs/common';
import { OrderController } from './OrderController';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [],
})
export class OrderModule {}
