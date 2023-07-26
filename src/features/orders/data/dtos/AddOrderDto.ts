import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Name of state' })
  name: string;
}
