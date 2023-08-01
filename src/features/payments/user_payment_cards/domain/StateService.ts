import { AddStateDto } from '../data/dtos/AddStateDto';
import { UpdateStateDto } from '../data/dtos/UpdateStateDto';
import { State } from './State';

export class StateService implements State {
  repository: State;

  addState(newState: AddStateDto): boolean {
    return this.repository.addState(newState);
  }
  getState(StateId: string): any {
    return this.repository.getState(StateId);
  }
  getStates(): any {
    return this.repository.getStates();
  }
  updateState(StateId: string, updatedState: UpdateStateDto): boolean {
    return this.repository.updateState(StateId, updatedState);
  }
  deleteState(StateId: string): boolean {
    return this.repository.deleteState(StateId);
  }
}
