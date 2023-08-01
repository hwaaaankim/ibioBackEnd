import { AddTaxDto } from '../data/dtos/AddTaxDto';
import { AddTaxRateDto } from '../data/dtos/AddTaxRateDto';
import { UpdateTaxDto } from '../data/dtos/UpdateTaxDto';
import { UpdateTaxRateDto } from '../data/dtos/UpdateTaxRateDto';

export interface Tax {
  addTax(newTax: AddTaxDto): any;
  getTax(taxId: string): any;
  getTaxes(): any;
  updateTax(taxId: string, updatedTax: UpdateTaxDto): any;
  deleteTax(taxId: string): any;

  addTaxRate(newTaxRate: AddTaxRateDto): any;
  getTaxRate(taxRateId: string): any;
  getTaxRates(): any;
  updateTaxRate(taxId: string, updatedTax: UpdateTaxRateDto): any;
  deleteTaxRate(taxRateId: string): any;
}
