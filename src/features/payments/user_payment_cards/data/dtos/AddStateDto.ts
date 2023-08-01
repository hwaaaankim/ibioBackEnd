import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddStateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'name', description: 'Name of state' })
  name: string;
}
