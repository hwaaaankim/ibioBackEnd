import { AddOrderDto } from '../data/dtos/AddOrderDto';
import { UpdateOrderDto } from '../data/dtos/UpdateOrderDto';

export interface Order {
  addOrder(newOrder: AddOrderDto): any;
  getOrder(OrderId: string): any;
  getOrders(): any;
  updateOrder(OrderId: string, updatedOrder: UpdateOrderDto): any;
  deleteOrder(OrderId: string): any;
}
