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
import { UpdateShippingAddressDto } from '../data/dtos/UpdateShippingAddressDto';
import { ShippingAddressService } from '../domain/ShippingAddressService';
import { Role } from '../../../../util/decorators/Role';
import { ApiExtraModels } from '@nestjs/swagger';
import { AddShippingAddressDto } from '../data/dtos/AddShippingAddressDto';

@ApiExtraModels(AddShippingAddressDto, UpdateShippingAddressDto)
@Controller('shipping_addresses')
export class ShippingAddressController {
  shippingAddressService: ShippingAddressService;

  constructor() {
    this.shippingAddressService = new ShippingAddressService();
    this.shippingAddressService.repository =
      DatabaseFactory.getRepository('Shipping_ADDRESS');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addShippingAddress(@Body() newAddress: AddShippingAddressDto) {
    return this.shippingAddressService.addShippingAddress(newAddress);
  }

  @Get(':id')
  getShippingAddress(@Param('id') shippingAddressId: string): any {
    return this.shippingAddressService.getShippingAddress(shippingAddressId);
  }

  @Get()
  getShippingAddressse(): any {
    return this.shippingAddressService.getShippingAddresses();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateAddress(
    @Param('id') ShippingAddressId: string,
    @Body() shippingUpdatedAddress: UpdateShippingAddressDto,
  ): any {
    return this.shippingAddressService.updateShippingAddress(
      ShippingAddressId,
      shippingUpdatedAddress,
    );
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteShippingAddress(@Param('id') shippingAddressId: string): any {
    return this.shippingAddressService.deleteShippingAddress(shippingAddressId);
  }
}
