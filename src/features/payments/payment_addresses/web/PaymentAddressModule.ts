import { Module } from '@nestjs/common';
import { PaymentAddressController } from './PaymentAddressController';

@Module({
  imports: [],
  controllers: [PaymentAddressController],
  providers: [],
})
export class PaymentAddressModule {}
