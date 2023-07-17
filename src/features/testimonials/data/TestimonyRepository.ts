import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { TestimonyEntity } from './models/TestimonyEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Testimony } from '../domain/Testimony';
import { TestimonyDto } from './dtos/TestimonyDto';
import { Like, getRepository } from 'typeorm';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';

import { join } from 'path';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';

export class TestimonyRepository implements Testimony {
  entity: EntityClassOrSchema = TestimonyEntity;
  private testimonyRepository = AppDataSource.getRepository(this.entity);

  async getTestimonials(page?: number, limit?: number): Promise<any> {
    const currentPage = page * 1 || 10;
    const skip = (currentPage - 1) * limit || 0;
    const allTestimonials = await this.testimonyRepository.count();
    const testimonials = await this.testimonyRepository.find();
    return { allTestimonials, testimonials };
  }


  async addTestimony(testimony: TestimonyDto): Promise<boolean> {
    try {
      const created = await this.testimonyRepository.create(testimony).save();
      return this.testimonyRepository.findOne({
        where: { id: created.id },
        
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Testimony already exists');
      }
      throw new SystemErrorException();
    }
  }

  async updateTestimony(id: string, testimonyDto: TestimonyDto): Promise<any> {
    const testimony: TestimonyEntity = await this.testimonyRepository.findOne({
      where: { id: id },
    });
    if (!testimony) throw new DataNotFoundException('Testimony not found');

    try {
      testimony.fullName = testimonyDto.fullName;
      testimony.role = testimonyDto.role;
      testimony.description = testimonyDto.description;

      const updated = await testimony.save();
      return this.testimonyRepository.findOne({
        where: { id: updated.id },
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Testimony already exists');
      }
      throw new SystemErrorException();
    }
  }

  async deleteTestimony(id: string): Promise<boolean> {
    
    const testimony: TestimonyEntity = await this.testimonyRepository.findOne({
      where: {
        id: id,
      },
    });
    try {      
      testimony.remove();
      return true;
    } catch (error) {
      throw new SystemErrorException();
    }
  }

}
