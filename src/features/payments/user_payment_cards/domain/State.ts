import { AddStateDto } from '../data/dtos/AddStateDto';
import { UpdateStateDto } from '../data/dtos/UpdateStateDto';

export interface State {
  addState(newState: AddStateDto): any;
  getState(StateId: string): any;
  getStates(): any;
  updateState(StateId: string, updatedState: UpdateStateDto): any;
  deleteState(StateId: string): any;
}
