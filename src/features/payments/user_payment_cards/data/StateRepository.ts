import { StateEntity } from './models/StateEntity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { State } from '../domain/State';
import { AddStateDto } from './dtos/AddStateDto';
import { UpdateStateDto } from './dtos/UpdateStateDto';
import { getRepository } from 'typeorm';
import { SystemErrorException } from '../../../util/exception/SystemErrorException';
import { DuplicateResouceFound } from '../../../util/exception/DuplicateResourceFound';
import { DataNotFoundException } from '../../../util/exception/DataNotFoundException';
import { AppDataSource } from '../../../database/config/TypeOrmConfig';

export class StateRepository implements State {
  entity: EntityClassOrSchema = StateEntity;
  stateRepository = AppDataSource.getRepository(this.entity);

  async addState(newState: AddStateDto): Promise<boolean> {
    try {
      await this.stateRepository.create(newState).save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('State already exists');
      } else {
        throw new SystemErrorException(e);
      }
    }
  }

  async getState(stateId: string): Promise<any> {
    const state = await this.stateRepository.findOne({
      where: { id: stateId },
    });
    if (!state) {
      throw new DataNotFoundException('State not dound');
    }
    return state;
  }

  async getStates(): Promise<any> {
    const states = await this.stateRepository.find();
    if (!states)
      throw new DataNotFoundException('No States have been created yet');
    return states;
  }

  async updateState(
    stateId: string,
    updatedState: UpdateStateDto,
  ): Promise<boolean> {
    const state: StateEntity = await this.getState(stateId);

    if (updatedState.name) state.name = updatedState.name;

    try {
      await state.save();
      return true;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new DuplicateResouceFound('Duplicate resource found');
      } else {
        throw new SystemErrorException('Something unknown went wrong');
      }
    }
  }

  async deleteState(stateId: string): Promise<boolean> {
    const state: StateEntity = await this.getState(stateId);
    try {
      await state.softRemove();
      return true;
    } catch (e) {
      throw new SystemErrorException();
    }
  }
}
