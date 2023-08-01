import { Module } from '@nestjs/common';
import { ShippingAddressController } from './ShippingAddressController';

@Module({
  imports: [],
  controllers: [ShippingAddressController],
  providers: [],
})
export class ShippingAddressModule {}
