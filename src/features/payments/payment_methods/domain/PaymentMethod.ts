import { AddPaymentMethodDto } from '../data/dtos/AddPaymentMethodDto';
import { UpdatePaymentMethodDto } from '../data/dtos/UpdatePaymentMethodDto';

export interface PaymentMethod {
  addPaymentMethod(newPaymentMethod: AddPaymentMethodDto): any;
  getPaymentMethod(paymentMethodId: string): any;
  getPaymentMethods(): any;
  updatePaymentMethod(
    paymentMethodId: string,
    updatedPaymentMethod: UpdatePaymentMethodDto,
  ): any;
  deletePaymentMethod(paymentMethodId: string): any;
}
