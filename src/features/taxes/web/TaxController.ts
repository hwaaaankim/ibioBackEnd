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
import { AddTaxDto } from '../data/dtos/AddTaxDto';
import { UpdateTaxDto } from '../data/dtos/UpdateTaxDto';
import { TaxService } from '../domain/TaxService';
import { Role } from '../../../util/decorators/Role';
import { ApiExtraModels } from '@nestjs/swagger';
import { UpdateTaxRateDto } from '../data/dtos/UpdateTaxRateDto';
import { AddTaxRateDto } from '../data/dtos/AddTaxRateDto';

@ApiExtraModels(AddTaxDto, UpdateTaxDto)
@Controller('taxes')
export class TaxController {
  taxService: TaxService;

  constructor() {
    this.taxService = new TaxService();
    this.taxService.repository = DatabaseFactory.getRepository('Tax');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addTax(@Body() newTax: AddTaxDto) {
    return this.taxService.addTax(newTax);
  }

  @Get(':id')
  getTax(@Param('id') taxId: string): any {
    return this.taxService.getTax(taxId);
  }

  @Get()
  getTaxes(): any {
    return this.taxService.getTaxes();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateTax(@Param('id') taxId: string, @Body() updatedTax: UpdateTaxDto): any {
    return this.taxService.updateTax(taxId, updatedTax);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteTax(@Param('id') TaxId: string): any {
    return this.taxService.deleteTax(TaxId);
  }

  @Post('/tax_rates')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addTaxRate(@Body() newTaxRate: AddTaxRateDto) {
    return this.taxService.addTaxRate(newTaxRate);
  }

  @Get('/tax_rates/:id')
  getTaxRate(@Param('id') taxRateId: string): any {
    return this.taxService.getTaxRate(taxRateId);
  }

  @Get()
  getTaxRates(): any {
    return this.taxService.getTaxRates();
  }

  @Put('/tax_rates/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateTaxRate(
    @Param('id') taxRateId: string,
    @Body() updatedTaxRate: UpdateTaxRateDto,
  ): any {
    return this.taxService.updateTaxRate(taxRateId, updatedTaxRate);
  }

  @Delete('/tax_rates/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteTaxRate(@Param('id') taxRateId: string): any {
    return this.taxService.deleteTaxRate(taxRateId);
  }
}
