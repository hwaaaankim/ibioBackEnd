import { AddPaymentAddressDto } from '../data/dtos/AddPaymentAddressDto';
import { UpdatePaymentAddressDto } from '../data/dtos/UpdatePaymentAddressDto';
import { PaymentAddress } from './PaymentAddress';

export class PaymentAddressService implements PaymentAddress {
  repository: PaymentAddress;

  addPaymentAddress(newAddress: AddPaymentAddressDto): any {
    return this.repository.addPaymentAddress(newAddress);
  }
  getPaymentAddress(addressId: string): any {
    return this.repository.getPaymentAddress(addressId);
  }
  getPaymentAddresses(): any {
    return this.repository.getPaymentAddresses();
  }
  updatePaymentAddress(
    addressId: string,
    updatedPaymentAddress: UpdatePaymentAddressDto,
  ): any {
    return this.repository.updatePaymentAddress(
      addressId,
      updatedPaymentAddress,
    );
  }
  deletePaymentAddress(addressId: string): any {
    return this.repository.deletePaymentAddress(addressId);
  }
}
