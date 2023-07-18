import { Module } from '@nestjs/common';
import { CurrencyController } from './CurrencyController';

@Module({
  imports: [],
  controllers: [CurrencyController],
  providers: [],
})
export class CurrencyModule {}
