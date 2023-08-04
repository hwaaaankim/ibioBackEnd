import { AddShippingAddressDto } from '../data/dtos/AddShippingAddressDto';
import { UpdateShippingAddressDto } from '../data/dtos/UpdateShippingAddressDto';
import { ShippingAddress } from './ShippingAddress';

export class ShippingAddressService implements ShippingAddress {
  repository: ShippingAddress;

  addShippingAddress(newAddress: AddShippingAddressDto): any {
    return this.repository.addShippingAddress(newAddress);
  }
  getShippingAddress(addressId: string): any {
    return this.repository.getShippingAddress(addressId);
  }
  getShippingAddresses(): any {
    return this.repository.getShippingAddresses();
  }
  updateShippingAddress(
    addressId: string,
    updatedShippingAddress: UpdateShippingAddressDto,
  ): any {
    return this.repository.updateShippingAddress(
      addressId,
      updatedShippingAddress,
    );
  }
  deleteShippingAddress(addressId: string): any {
    return this.repository.deleteShippingAddress(addressId);
  }
}
