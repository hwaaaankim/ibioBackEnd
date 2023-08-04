import { PaymentMethodEntity } from './models/PaymentMethodEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { PaymentMethod } from '../domain/PaymentMethod';
import { AddPaymentMethodDto } from './dtos/AddPaymentMethodDto';
import { UpdatePaymentMethodDto } from './dtos/UpdatePaymentMethodDto';
import { SystemErrorException } from '../../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../../database/config/TypeOrmConfig';
import { join } from 'path';
import * as fs from 'fs';
export class PaymentMethodRepository implements PaymentMethod {
  entity: EntityClassOrSchema = PaymentMethodEntity;
  paymentMethodRepository = AppDataSource.getRepository(this.entity);

  async addPaymentMethod(
    newPaymentMethod: AddPaymentMethodDto,
  ): Promise<boolean> {
    try {
      await this.paymentMethodRepository.create(newPaymentMethod).save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Payment method already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getPaymentMethod(paymentMethodId: string): Promise<any> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { id: paymentMethodId },
    });
    if (!paymentMethod) {
      throw new DataNotFoundException('PaymentMethod not dound');
    }
    return paymentMethod;
  }

  async getPaymentMethods(): Promise<any> {
    const paymentMethods = await this.paymentMethodRepository.find();
    if (!paymentMethods)
      throw new DataNotFoundException(
        'No PaymentMethods have been created yet',
      );
    return paymentMethods;
  }

  private async unlinkIcon(icon: string): Promise<any> {
    if (fs.existsSync(process.cwd() + '/uploads/images/' + icon))
      fs.unlink(join(process.cwd() + '/uploads/images/' + icon), (err) => {
        if (err) {
          console.error(err);
        }
        return true;
      });
  }

  async updatePaymentMethod(
    paymentMethodId: string,
    updatedPaymentMethod: UpdatePaymentMethodDto,
  ): Promise<boolean> {
    const paymentMethod: PaymentMethodEntity = await this.getPaymentMethod(
      paymentMethodId,
    );

    if (updatedPaymentMethod.name)
      paymentMethod.name = updatedPaymentMethod.name;
    if (updatedPaymentMethod.icon) {
      await this.unlinkIcon(paymentMethod.icon);
      paymentMethod.icon = updatedPaymentMethod.icon;
    }
    try {
      await paymentMethod.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deletePaymentMethod(paymentMethodId: string): Promise<boolean> {
    const paymentMethod: PaymentMethodEntity = await this.getPaymentMethod(
      paymentMethodId,
    );
    try {
      await paymentMethod.softRemove();
      await this.unlinkIcon(paymentMethod.icon);
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
