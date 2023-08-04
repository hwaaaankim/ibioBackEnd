import { CurrencyEntity } from './models/CurrencyEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Currency } from '../domain/Currency';
import { AddCurrencyDto } from './dtos/AddCurrencyDto';
import { UpdateCurrencyDto } from './dtos/UpdateCurrencyDto';
import { getRepository } from 'typeorm';
import { SystemErrorException } from 'src/util/exception/SystemErrorException';
import { DuplicateResouceFound } from 'src/util/exception/DuplicateResourceFound';
import { DataNotFoundException } from 'src/util/exception/DataNotFoundException';
import { AppDataSource } from 'src/database/config/TypeOrmConfig';

export class CurrencyRepository implements Currency {
  entity: EntityClassOrSchema = CurrencyEntity;
  currencyRepository = AppDataSource.getRepository(this.entity);

  async addCurrency(newCurrency: AddCurrencyDto): Promise<boolean> {
    try {
      await this.currencyRepository.create(newCurrency).save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Currency already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getCurrency(currencyId: string): Promise<any> {
    const currency = await this.currencyRepository.findOne({
      where: { id: currencyId },
    });
    if (!currency) {
      throw new DataNotFoundException('Curremcy not found.');
    }
    return currency;
  }

  async getCurrencies(): Promise<any> {
    const currencies = await this.currencyRepository.find();
    if (!currencies)
      throw new DataNotFoundException('No Currencys have been created yet');
    return currencies;
  }

  async updateCurrency(
    currencyId: string,
    updatedCurrency: UpdateCurrencyDto,
  ): Promise<boolean> {
    const currency: CurrencyEntity = await this.getCurrency(currencyId);

    if (updatedCurrency.name) currency.name = updatedCurrency.name;
    if (updatedCurrency.code) currency.code = updatedCurrency.code;
    if (updatedCurrency.decimalPlaces)
      currency.decimalPlaces = updatedCurrency.decimalPlaces;
    if (updatedCurrency.dsiplaySymbol)
      currency.displaySymbol = updatedCurrency.dsiplaySymbol;
    if (updatedCurrency.isDefault) {
      currency.isDefault = updatedCurrency.isDefault;
    }
    try {
      await currency.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deleteCurrency(currencyId: string): Promise<boolean> {
    const currency: CurrencyEntity = await this.getCurrency(currencyId);
    try {
      await currency.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
