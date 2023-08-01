import { Module } from '@nestjs/common';
import { TaxController } from './TaxController';

@Module({
  imports: [],
  controllers: [TaxController],
  providers: [],
})
export class TaxModule {}
