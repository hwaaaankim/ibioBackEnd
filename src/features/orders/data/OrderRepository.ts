import { OrderEntity } from './models/OrderEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Order } from '../domain/Order';
import { AddOrderDto } from './dtos/AddOrderDto';
import { UpdateOrderDto } from './dtos/UpdateOrderDto';
import { getRepository } from 'typeorm';
import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';

export class OrderRepository implements Order {
  entity: EntityClassOrSchema = OrderEntity;
  OrderRepository = AppDataSource.getRepository(this.entity);

  async addOrder(newOrder: AddOrderDto): Promise<boolean> {
    try {
      await this.OrderRepository.create(newOrder).save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Order already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getOrder(OrderId: string): Promise<any> {
    const Order = await this.OrderRepository.findOne({
      where: { id: OrderId },
    });
    if (!Order) {
      throw new DataNotFoundException('Order not dound');
    }
    return Order;
  }

  async getOrders(): Promise<any> {
    const Orders = await this.OrderRepository.find();
    if (!Orders)
      throw new DataNotFoundException('No Orders have been created yet');
    return Orders;
  }

  async updateOrder(
    OrderId: string,
    updatedOrder: UpdateOrderDto,
  ): Promise<boolean> {
    const Order: OrderEntity = await this.getOrder(OrderId);

    if (updatedOrder.name) Order.name = updatedOrder.name;

    try {
      await Order.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deleteOrder(OrderId: string): Promise<boolean> {
    const Order: OrderEntity = await this.getOrder(OrderId);
    try {
      await Order.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
