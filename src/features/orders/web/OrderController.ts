import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  Delete,
  ValidationPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { AddOrderDto } from '../data/dtos/AddOrderDto';
import { UpdateOrderDto } from '../data/dtos/UpdateOrderDto';
import { OrderService } from '../domain/OrderService';
import { Role } from '../../../util/decorators/Role';

@Controller('Orders')
export class OrderController {
  OrderService: OrderService;

  constructor() {
    this.OrderService = new OrderService();
    this.OrderService.repository = DatabaseFactory.getRepository('Order');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addOrder(@Body() newOrder: AddOrderDto) {
    return this.OrderService.addOrder(newOrder);
  }

  @Get(':id')
  getOrder(@Param('id') OrderId: string): any {
    return this.OrderService.getOrder(OrderId);
  }

  @Get()
  getOrders(): any {
    return this.OrderService.getOrders();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateOrder(
    @Param('id') OrderId: string,
    @Body() updatedOrder: UpdateOrderDto,
  ): any {
    return this.OrderService.updateOrder(OrderId, updatedOrder);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteOrder(@Param('id') OrderId: string): any {
    return this.OrderService.deleteOrder(OrderId);
  }
}
