import { AddOrderDto } from '../data/dtos/AddOrderDto';
import { UpdateOrderDto } from '../data/dtos/UpdateOrderDto';
import { Order } from './Order';

export class OrderService implements Order {
  repository: Order;

  addOrder(newOrder: AddOrderDto): boolean {
    return this.repository.addOrder(newOrder);
  }
  getOrder(OrderId: string): any {
    return this.repository.getOrder(OrderId);
  }
  getOrders(): any {
    return this.repository.getOrders();
  }
  updateOrder(OrderId: string, updatedOrder: UpdateOrderDto): boolean {
    return this.repository.updateOrder(OrderId, updatedOrder);
  }
  deleteOrder(OrderId: string): boolean {
    return this.repository.deleteOrder(OrderId);
  }
}
