import { AddCurrencyDto } from '../data/dtos/AddCurrencyDto';
import { UpdateCurrencyDto } from '../data/dtos/UpdateCurrencyDto';

export interface Currency {
  addCurrency(newCurrency: AddCurrencyDto): any;
  getCurrency(currencyId: string): any;
  getCurrencies(): any;
  updateCurrency(currencyId: string, updatedCurrency: UpdateCurrencyDto): any;
  deleteCurrency(currencyId: string): any;
}
