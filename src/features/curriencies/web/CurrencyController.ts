import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  Delete,
  Patch,
  ValidationPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { AddCurrencyDto } from '../data/dtos/AddCurrencyDto';
import { UpdateCurrencyDto } from '../data/dtos/UpdateCurrencyDto';
import { CurrencyService } from '../domain/CurrencyService';
import { Role } from 'src/util/decorators/Role';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(AddCurrencyDto, UpdateCurrencyDto)
@Controller('currencies')
export class CurrencyController {
  currencyService: CurrencyService;

  constructor() {
    this.currencyService = new CurrencyService();
    this.currencyService.repository = DatabaseFactory.getRepository('Currency');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addCurrency(@Body() newCurrency: AddCurrencyDto) {
    return this.currencyService.addCurrency(newCurrency);
  }

  @Get(':id')
  getCurrency(@Param('id') currencyId: string): any {
    return this.currencyService.getCurrency(currencyId);
  }

  @Get()
  getCurrencies(): any {
    return this.currencyService.getCurrencies();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateCurrency(
    @Param('id') currencyId: string,
    @Body() updatedCurrency: UpdateCurrencyDto,
  ): any {
    return this.currencyService.updateCurrency(currencyId, updatedCurrency);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteCurrency(@Param('id') currencyId: string): any {
    return this.currencyService.deleteCurrency(currencyId);
  }
}
