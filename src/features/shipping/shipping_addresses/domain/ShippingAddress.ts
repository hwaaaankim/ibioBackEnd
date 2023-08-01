import { AddShippingAddressDto } from '../data/dtos/AddShippingAddressDto';
import { UpdateShippingAddressDto } from '../data/dtos/UpdateShippingAddressDto';

export interface ShippingAddress {
  addShippingAddress(newShippingAddress: AddShippingAddressDto): any;
  getShippingAddress(addressId: string): any;
  getShippingAddresses(): any;
  updateShippingAddress(
    addressId: string,
    updatedShippingAddress: UpdateShippingAddressDto,
  ): any;
  deleteShippingAddress(addressId: string): any;
}
