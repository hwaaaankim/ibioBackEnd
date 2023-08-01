import { AddPaymentMethodDto } from '../data/dtos/AddPaymentMethodDto';
import { UpdatePaymentMethodDto } from '../data/dtos/UpdatePaymentMethodDto';
import { PaymentMethod } from './PaymentMethod';

export class PaymentMethodService implements PaymentMethod {
  repository: PaymentMethod;

  addPaymentMethod(newPaymentMethod: AddPaymentMethodDto): boolean {
    return this.repository.addPaymentMethod(newPaymentMethod);
  }
  getPaymentMethod(paymentMethodId: string): any {
    return this.repository.getPaymentMethod(paymentMethodId);
  }
  getPaymentMethods(): any {
    return this.repository.getPaymentMethods();
  }
  updatePaymentMethod(
    paymentMethodId: string,
    updatedPaymentMethod: UpdatePaymentMethodDto,
  ): boolean {
    return this.repository.updatePaymentMethod(
      paymentMethodId,
      updatedPaymentMethod,
    );
  }
  deletePaymentMethod(paymentMethodId: string): boolean {
    return this.repository.deletePaymentMethod(paymentMethodId);
  }
}
