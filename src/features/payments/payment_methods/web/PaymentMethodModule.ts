import { Module } from '@nestjs/common';
import { PaymentMethodController } from './PaymentMethodController';

@Module({
  imports: [],
  controllers: [PaymentMethodController],
  providers: [],
})
export class PaymentMethodModule {}
