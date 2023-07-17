import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { FaqEntity } from './models/FaqEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Faq } from '../domain/Faq';
import { FaqDto } from './dtos/FaqDto';
import { getRepository } from 'typeorm';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';

import { AppDataSource } from '../../../database/config/TypeOrmConfig';

export class FaqRepository implements Faq {
  entity: EntityClassOrSchema = FaqEntity;
  private faqRepository = AppDataSource.getRepository(this.entity);

  async getFaqs(page?: number, limit?: number): Promise<any> {
    const currentPage = page * 1 || 10;
    const take = limit * 1;
    const skip = (currentPage - 1) * limit || 0;
    const allFaqs = await this.faqRepository.count();
    const faqs = await this.faqRepository.find();
    return { allFaqs, faqs };
  }

  async addFaq(faq: FaqDto): Promise<boolean> {
    console.log("faq repo: ")
    try {
      const created = await this.faqRepository.create(faq).save();
      // add images

      return this.faqRepository.findOne({
        where: { id: created.id },
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Faq already exists');
      }
      throw new SystemErrorException();
    }
  }

  async updateFaq(id: string, faqDto: FaqDto): Promise<any> {
    const faq: FaqEntity = await this.faqRepository.findOne({
      where: { id: id },
    });
    if (!faq) throw new DataNotFoundException('Faq not found');

    try {
      faq.question = faqDto.question;
      faq.answer = faqDto.answer;

      const updated = await faq.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Faq already exists');
      }
      throw new SystemErrorException();
    }
  }

  async deleteFaq(id: string): Promise<boolean> {
    
    const faq: FaqEntity = await this.faqRepository.findOne({
      where: {
        id: id,
      },
    });
    try {
      faq.remove();
      return true;
    } catch (error) {
      throw new SystemErrorException();
    }
  }
}
