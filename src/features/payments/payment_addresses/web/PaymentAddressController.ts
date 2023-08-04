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
import { DatabaseFactory } from '../../../../database/DatabaseFactory';
import { JwtAuthGuard } from '../../../../util/auth/jwt/JwtAuthGuard';
import { UpdatePaymentAddressDto } from '../data/dtos/UpdatePaymentAddressDto';
import { PaymentAddressService } from '../domain/PaymentAddressService';
import { Role } from '../../../../util/decorators/Role';
import { ApiExtraModels } from '@nestjs/swagger';
import { AddPaymentAddressDto } from '../data/dtos/AddPaymentAddressDto';

@ApiExtraModels(AddPaymentAddressDto, UpdatePaymentAddressDto)
@Controller('payment_addresses')
export class PaymentAddressController {
  paymentAddressService: PaymentAddressService;

  constructor() {
    this.paymentAddressService = new PaymentAddressService();
    this.paymentAddressService.repository =
      DatabaseFactory.getRepository('PAYMENT_ADDRESS');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addPaymentAddress(@Body() newAddress: AddPaymentAddressDto) {
    return this.paymentAddressService.addPaymentAddress(newAddress);
  }

  @Get(':id')
  getPaymentAddress(@Param('id') paymentAddressId: string): any {
    return this.paymentAddressService.getPaymentAddress(paymentAddressId);
  }

  @Get()
  getPaymentAddressse(): any {
    return this.paymentAddressService.getPaymentAddresses();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateAddress(
    @Param('id') paymentAddressId: string,
    @Body() paymentUpdatedAddress: UpdatePaymentAddressDto,
  ): any {
    return this.paymentAddressService.updatePaymentAddress(
      paymentAddressId,
      paymentUpdatedAddress,
    );
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deletePaymentAddress(@Param('id') paymentAddressId: string): any {
    return this.paymentAddressService.deletePaymentAddress(paymentAddressId);
  }
}
