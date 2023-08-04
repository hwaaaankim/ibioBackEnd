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
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { DatabaseFactory } from '../../../../database/DatabaseFactory';
import { JwtAuthGuard } from '../../../../util/auth/jwt/JwtAuthGuard';
import { AddPaymentMethodDto } from '../data/dtos/AddPaymentMethodDto';
import { UpdatePaymentMethodDto } from '../data/dtos/UpdatePaymentMethodDto';
import { PaymentMethodService } from '../domain/PaymentMethodService';
import { Role } from '../../../../util/decorators/Role';
import { ApiExtraModels } from '@nestjs/swagger';
import { CompressionPipe } from 'src/util/file_upload/CompressionPipe';
import { ValidationException } from 'src/util/exception/ValidationException';

@ApiExtraModels(AddPaymentMethodDto, UpdatePaymentMethodDto)
@Controller('payment_methods')
export class PaymentMethodController {
  paymentMethodService: PaymentMethodService;

  constructor() {
    this.paymentMethodService = new PaymentMethodService();
    this.paymentMethodService.repository =
      DatabaseFactory.getRepository('Payment_Method');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addPaymentMethod(
    @Body() newPaymentMethod: AddPaymentMethodDto,
    @UploadedFiles(CompressionPipe) icon: any,
  ) {
    if (!icon) {
      throw new ValidationException('Icon is required');
    }
    newPaymentMethod.icon = icon;
    return this.paymentMethodService.addPaymentMethod(newPaymentMethod);
  }

  @Get(':id')
  getPaymentMethod(@Param('id') paymentMethodId: string): any {
    return this.paymentMethodService.getPaymentMethod(paymentMethodId);
  }

  @Get()
  getPaymentMethods(): any {
    return this.paymentMethodService.getPaymentMethods();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updatePaymentMethod(
    @Param('id') paymentMethodId: string,
    @Body() updatedPaymentMethod: UpdatePaymentMethodDto,
    @UploadedFiles(CompressionPipe) icon: any,
  ): any {
    if (icon) updatedPaymentMethod.icon = icon;
    return this.paymentMethodService.updatePaymentMethod(
      paymentMethodId,
      updatedPaymentMethod,
    );
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deletePaymentMethod(@Param('id') paymentMethodId: string): any {
    return this.paymentMethodService.deletePaymentMethod(paymentMethodId);
  }
}
