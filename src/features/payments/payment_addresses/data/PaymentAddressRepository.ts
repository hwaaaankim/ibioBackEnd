import { AppDataSource } from '../../../../database/config/TypeOrmConfig';
import { PaymentAddressEntity } from './models/PaymentAddressEntity';
import { PaymentAddress } from '../domain/PaymentAddress';
import { AddPaymentAddressDto } from '../data/dtos/AddPaymentAddressDto';
import { UpdatePaymentAddressDto } from '../data/dtos/UpdatePaymentAddressDto';
import { SystemErrorException } from '../../../../util/exception/SystemErrorException';
import { DataNotFoundException } from 'src/util/exception/DataNotFoundException';

export class PaymentAddressRepository implements PaymentAddress {
  paymentAddressRepository = AppDataSource.getRepository(PaymentAddressEntity);

  async addPaymentAddress(
    newPaymentAddress: AddPaymentAddressDto,
  ): Promise<boolean> {
    try {
      await this.paymentAddressRepository.create(newPaymentAddress).save();
      return true;
    } catch (ex) {
      throw new SystemErrorException();
    }
  }

  async getPaymentAddress(paymentAddressId: string): Promise<any> {
    const paymentAddress = await this.paymentAddressRepository.findOne({
      where: { id: paymentAddressId },
    });
    if (!paymentAddress) {
      throw new DataNotFoundException('Payemnt address ');
    }
    return paymentAddress;
  }

  async getPaymentAddresses(): Promise<any> {
    const paymentAddresses = await this.paymentAddressRepository.find();
    if (!paymentAddresses) {
      throw new DataNotFoundException('Payemnt address ');
    }
    return paymentAddresses;
  }

  async updatePaymentAddress(
    paymentAddressId: string,
    updatedPaymentAddress: UpdatePaymentAddressDto,
  ) {
    const paymentAddress: PaymentAddressEntity = await this.getPaymentAddress(
      paymentAddressId,
    );
    if (updatedPaymentAddress.userId)
      paymentAddress.userId = updatedPaymentAddress.userId;
    if (updatedPaymentAddress.stateId)
      paymentAddress.stateId = updatedPaymentAddress.stateId;
    if (updatedPaymentAddress.company)
      paymentAddress.company = updatedPaymentAddress.company;
    if (updatedPaymentAddress.addressOne)
      paymentAddress.addressOne = updatedPaymentAddress.addressOne;
    if (updatedPaymentAddress.addressTwo)
      paymentAddress.addressTwo = updatedPaymentAddress.addressTwo;
    if (updatedPaymentAddress.fax)
      paymentAddress.fax = updatedPaymentAddress.fax;
    if (updatedPaymentAddress.postCode)
      paymentAddress.postCode = updatedPaymentAddress.postCode;
    if (updatedPaymentAddress.city)
      paymentAddress.city = updatedPaymentAddress.city;
    if (updatedPaymentAddress.telephone)
      paymentAddress.telephone = updatedPaymentAddress.telephone;
    try {
      await paymentAddress.save();
    } catch (e) {
      throw new SystemErrorException();
    }
  }
  async deletePaymentAddress(paymentAddressId: string): Promise<boolean> {
    const paymentAddress: PaymentAddressEntity = await this.getPaymentAddress(
      paymentAddressId,
    );
    try {
      await paymentAddress.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
