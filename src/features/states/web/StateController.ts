import {
  Controller,
  Post,
  Get,
  Param,
  Put,
  Body,
  Delete,
  ValidationPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { DatabaseFactory } from 'src/database/DatabaseFactory';
import { JwtAuthGuard } from 'src/util/auth/jwt/JwtAuthGuard';
import { AddStateDto } from '../data/dtos/AddStateDto';
import { UpdateStateDto } from '../data/dtos/UpdateStateDto';
import { StateService } from '../domain/StateService';
import { Role } from '../../../util/decorators/Role';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(AddStateDto, UpdateStateDto)
@Controller('states')
export class StateController {
  StateService: StateService;

  constructor() {
    this.StateService = new StateService();
    this.StateService.repository = DatabaseFactory.getRepository('STATE');
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  addState(@Body() newState: AddStateDto) {
    return this.StateService.addState(newState);
  }

  @Get(':id')
  getState(@Param('id') stateId: string): any {
    return this.StateService.getState(stateId);
  }

  @Get()
  getStates(): any {
    return this.StateService.getStates();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  updateState(
    @Param('id') stateId: string,
    @Body() updatedState: UpdateStateDto,
  ): any {
    return this.StateService.updateState(stateId, updatedState);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Role(['admin'])
  deleteState(@Param('id') stateId: string): any {
    return this.StateService.deleteState(stateId);
  }
}
