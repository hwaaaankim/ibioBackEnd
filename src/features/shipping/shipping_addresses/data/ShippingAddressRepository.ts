import { AppDataSource } from '../../../../database/config/TypeOrmConfig';
import { ShippingAddressEntity } from './models/ShippingAddressEntity';
import { ShippingAddress } from '../domain/ShippingAddress';
import { AddShippingAddressDto } from './dtos/AddShippingAddressDto';
import { UpdateShippingAddressDto } from './dtos/UpdateShippingAddressDto';
import { SystemErrorException } from '../../../../util/exception/SystemErrorException';
import { DataNotFoundException } from 'src/util/exception/DataNotFoundException';

export class ShippingAddressRepository implements ShippingAddress {
  ShippingAddressRepository = AppDataSource.getRepository(
    ShippingAddressEntity,
  );

  async addShippingAddress(
    newShippingAddress: AddShippingAddressDto,
  ): Promise<boolean> {
    try {
      await this.ShippingAddressRepository.create(newShippingAddress).save();
      return true;
    } catch (ex) {
      throw new SystemErrorException();
    }
  }

  async getShippingAddress(shippingAddressId: string): Promise<any> {
    const shippingAddress = await this.ShippingAddressRepository.findOne({
      where: { id: shippingAddressId },
    });
    if (!shippingAddress) {
      throw new DataNotFoundException('Payemnt address ');
    }
    return shippingAddress;
  }

  async getShippingAddresses(): Promise<any> {
    const shippingAddresses = await this.ShippingAddressRepository.find();
    if (!shippingAddresses) {
      throw new DataNotFoundException('Payemnt address ');
    }
    return shippingAddresses;
  }

  async updateShippingAddress(
    shippingAddressId: string,
    updatedShippingAddress: UpdateShippingAddressDto,
  ) {
    const shippingAddress: ShippingAddressEntity =
      await this.getShippingAddress(shippingAddressId);
    if (updatedShippingAddress.userId)
      shippingAddress.userId = updatedShippingAddress.userId;
    if (updatedShippingAddress.stateId)
      shippingAddress.stateId = updatedShippingAddress.stateId;
    if (updatedShippingAddress.company)
      shippingAddress.company = updatedShippingAddress.company;
    if (updatedShippingAddress.addressOne)
      shippingAddress.addressOne = updatedShippingAddress.addressOne;
    if (updatedShippingAddress.addressTwo)
      shippingAddress.addressTwo = updatedShippingAddress.addressTwo;
    if (updatedShippingAddress.fax)
      shippingAddress.fax = updatedShippingAddress.fax;
    if (updatedShippingAddress.postCode)
      shippingAddress.postCode = updatedShippingAddress.postCode;
    if (updatedShippingAddress.city)
      shippingAddress.city = updatedShippingAddress.city;
    if (updatedShippingAddress.telephone)
      shippingAddress.telephone = updatedShippingAddress.telephone;
    try {
      await shippingAddress.save();
    } catch (e) {
      throw new SystemErrorException();
    }
  }
  async deleteShippingAddress(ShippingAddressId: string): Promise<boolean> {
    const shippingAddress: ShippingAddressEntity =
      await this.getShippingAddress(ShippingAddressId);
    try {
      await shippingAddress.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
