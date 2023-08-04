import { TaxEntity } from './models/TaxEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Tax } from '../domain/Tax';
import { AddTaxDto } from './dtos/AddTaxDto';
import { UpdateTaxDto } from './dtos/UpdateTaxDto';
import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';
import { AddTaxRateDto } from './dtos/AddTaxRateDto';
import { UpdateTaxRateDto } from './dtos/UpdateTaxRateDto';
import { TaxRateEntity } from './models/TaxRateEntity';
import { promises } from 'dns';

export class TaxRepository implements Tax {
  entity: EntityClassOrSchema = TaxEntity;
  taxRepository = AppDataSource.getRepository(this.entity);
  taxRateRepository = AppDataSource.getRepository(TaxRateEntity);

  async addTax(newTax: AddTaxDto): Promise<boolean> {
    try {
      await this.taxRepository.create(newTax).save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Tax already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getTax(taxId: string): Promise<any> {
    const tax = await this.taxRepository.findOne({
      where: { id: taxId },
    });
    if (!tax) {
      throw new DataNotFoundException('Tax not dound');
    }
    return tax;
  }

  async getTaxes(): Promise<any> {
    const taxes = await this.taxRepository.find();
    if (!taxes)
      throw new DataNotFoundException('No Taxs have been created yet');
    return taxes;
  }

  async updateTax(taxId: string, updatedTax: UpdateTaxDto): Promise<boolean> {
    const tax: TaxEntity = await this.getTax(taxId);

    if (updatedTax.name) tax.name = updatedTax.name;

    try {
      await tax.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deleteTax(taxId: string): Promise<boolean> {
    const tax: TaxEntity = await this.getTax(taxId);
    try {
      await tax.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }

  async addTaxRate(newTaxRate: AddTaxRateDto): Promise<boolean> {
    try {
      await this.taxRateRepository.create(newTaxRate).save();
      return true;
    } catch (e) {
      throw new SystemErrorException(e);
    }
  }

  async getTaxRate(taxRateId: string): Promise<any> {
    const taxRate = await this.taxRateRepository.findOne({
      where: { id: taxRateId },
    });
    if (!taxRate) {
      throw new DataNotFoundException('Tax rate not dound');
    }
    return taxRate;
  }

  async getTaxRates(): Promise<any> {
    const taxRates = await this.taxRateRepository.find();
    if (!taxRates)
      throw new DataNotFoundException('No tax rate have been created yet');
    return taxRates;
  }

  async updateTaxRate(
    taxRateId: string,
    updatedTaxRate: UpdateTaxRateDto,
  ): Promise<boolean> {
    const taxRate: TaxRateEntity = await this.getTaxRate(taxRateId);

    if (updatedTaxRate.taxId) taxRate.taxId = updatedTaxRate.taxId;

    if (updatedTaxRate.stateId) taxRate.stateId = updatedTaxRate.stateId;

    if (updatedTaxRate.percent) taxRate.percent = updatedTaxRate.percent;
    try {
      await taxRate.save();
      return true;
    } catch (e) {
      throw new SystemErrorException('Something unknown went wrong');
    }
  }
  async deleteTaxRate(taxRateId: string) {
    const taxRate: TaxRateEntity = await this.getTaxRate(taxRateId);
    try {
      await taxRate.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
