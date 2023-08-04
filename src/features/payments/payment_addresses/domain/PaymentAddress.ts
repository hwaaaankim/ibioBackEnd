import { AddPaymentAddressDto } from '../data/dtos/AddPaymentAddressDto';
import { UpdatePaymentAddressDto } from '../data/dtos/UpdatePaymentAddressDto';

export interface PaymentAddress {
  addPaymentAddress(newPaymentAddress: AddPaymentAddressDto): any;
  getPaymentAddress(addressId: string): any;
  getPaymentAddresses(): any;
  updatePaymentAddress(
    addressId: string,
    updatedPaymentAddress: UpdatePaymentAddressDto,
  ): any;
  deletePaymentAddress(addressId: string): any;
}
