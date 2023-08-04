import { AddTaxDto } from '../data/dtos/AddTaxDto';
import { AddTaxRateDto } from '../data/dtos/AddTaxRateDto';
import { UpdateTaxDto } from '../data/dtos/UpdateTaxDto';
import { UpdateTaxRateDto } from '../data/dtos/UpdateTaxRateDto';
import { Tax } from './Tax';

export class TaxService implements Tax {
  repository: Tax;

  addTax(newTax: AddTaxDto): boolean {
    return this.repository.addTax(newTax);
  }
  getTax(taxId: string): any {
    return this.repository.getTax(taxId);
  }
  getTaxes(): any {
    return this.repository.getTaxes();
  }
  updateTax(taxId: string, updatedTax: UpdateTaxDto): boolean {
    return this.repository.updateTax(taxId, updatedTax);
  }
  deleteTax(taxId: string): boolean {
    return this.repository.deleteTax(taxId);
  }

  addTaxRate(newTaxRate: AddTaxRateDto) {
    return this.repository.addTaxRate(newTaxRate);
  }
  getTaxRate(taxRateId: string) {
    return this.repository.getTaxRate(taxRateId);
  }
  getTaxRates() {
    return this.repository.getTaxRates();
  }
  updateTaxRate(taxRateId: string, updatedRateTax: UpdateTaxRateDto) {
    return this.repository.updateTaxRate(taxRateId, updatedRateTax);
  }
  deleteTaxRate(taxRateId: string) {
    return this.repository.deleteTaxRate(taxRateId);
  }
}
