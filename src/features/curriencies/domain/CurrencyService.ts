import { AddCurrencyDto } from '../data/dtos/AddCurrencyDto';
import { UpdateCurrencyDto } from '../data/dtos/UpdateCurrencyDto';
import { Currency } from './Currency';

export class CurrencyService implements Currency {
  repository: Currency;

  addCurrency(newCurrency: AddCurrencyDto): boolean {
    return this.repository.addCurrency(newCurrency);
  }
  getCurrency(currencyId: string): any {
    return this.repository.getCurrency(currencyId);
  }
  getCurrencies(): any {
    return this.repository.getCurrencies();
  }
  updateCurrency(
    currencyId: string,
    updatedCurrency: UpdateCurrencyDto,
  ): boolean {
    return this.repository.updateCurrency(currencyId, updatedCurrency);
  }
  deleteCurrency(currencyId: string): boolean {
    return this.repository.deleteCurrency(currencyId);
  }
}
